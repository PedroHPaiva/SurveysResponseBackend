import { SurveysRepository } from "../repositories/production/surveys";
import { UserSurveyService } from "../services/userSurveyService";
import { isEndDateBeforeToday, getTodayDate } from "../helpers/utils";
import { SurveyFinalObject, GetevolutionParameters, Survey } from "../types/Surveys";
import { RedisRepository } from "../repositories/production/redis";

export class UserSurveyResponse {
  getEvolutionTime = async ({ startDate, endDate, groupBy }: GetevolutionParameters) => {
    try {
      const userSurveyRepository = new SurveysRepository();
      const userSurveyService = new UserSurveyService();
      const redisRepository = new RedisRepository();

      const cacheData = await redisRepository.getArrayFromRedis("key_usersSurveysResponse");

      if (!cacheData || cacheData.length === 0) {
        const groupByQueryFormat = groupBy === "month" ? "YYYY-MM" : groupBy === "day" ? "YYYY-MM-DD" : "YYYY-MM-DD HH24:00";
        const results = await userSurveyRepository.getEvolutionTimePerPeriod({ startDate, endDate, format: groupByQueryFormat });
        return userSurveyService.formatSurveysResults(results);
      }

      const endDateBeforeToday = isEndDateBeforeToday(endDate);

      if (endDateBeforeToday) {
        if (!groupBy || groupBy === "hour") return cacheData;

        let results = userSurveyService.filterSurveyDataByDateRange(cacheData, startDate, endDate);
        results = userSurveyService.groupSurveyData(results, groupBy);
        return results;
      }

      if (!endDateBeforeToday) {
        const todayDate = getTodayDate();

        let results = await userSurveyRepository.getEvolutionTimePerPeriod({ startDate: todayDate, endDate: todayDate, format: "YYYY-MM-DD HH24:00" });
        results = userSurveyService.formatSurveysResults(results);

        let agreggatedResults = userSurveyService.mergeWithoutDuplicates(cacheData, results as SurveyFinalObject[]);

        agreggatedResults = userSurveyService.filterSurveyDataByDateRange(agreggatedResults, startDate, endDate);
        agreggatedResults = userSurveyService.groupSurveyData(agreggatedResults, groupBy);

        return agreggatedResults;
      }
    } catch (err) {
      throw new Error(`Erro ao receber os itens`);
    }
  };

  saveSurveysInCache = async () => {
    try {
      const userSurveyRepository = new SurveysRepository();
      const redisRepository = new RedisRepository();

      const results = await userSurveyRepository.getEvolutionTime();

      const formatted = results.map((r: Survey) => ({
        origin: r.origin,
        period: r.period,
        total: Number(r.total),
        converted: Number(r.converted),
        conversionRate: r.total > 0 ? parseFloat(((r.converted / r.total) * 100).toFixed(1)) : 0,
      }));

      await redisRepository.addToArrayInRedis("key_usersSurveysResponse", formatted);

      return "Dados inseridos com sucesso no redis";
    } catch (err) {
      throw new Error(`Erro ao inserir os itens no redis`);
    }
  };
}
