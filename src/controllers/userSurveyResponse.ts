import { UserSurveyRepository } from "../repositories/userSurveyRepository";
import { UserSurveyService } from "../services/userSurveyService";
import { addToArrayInRedis, getArrayFromRedis } from "../repositories/redisRepository";
import { isEndDateBeforeToday, getTodayDate } from "../helpers/utils";

interface EvolutionParameters {
  startDate: string;
  endDate: string;
  groupBy?: string;
}

interface SurveyItem {
  origin: string;
  period: string;
  total: number;
  converted: number;
  conversionRate: number;
}

export class UserSurveyResponse {
  getEvolutionTime = async ({ startDate, endDate, groupBy }: EvolutionParameters) => {
    try {
      const userSurveyRepository = new UserSurveyRepository();
      const userSurveyService = new UserSurveyService();

      const cacheData = await getArrayFromRedis("key_usersSurveysResponse");

      if (cacheData.length === 0) {
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

        let agreggatedResults = userSurveyService.mergeWithoutDuplicates(cacheData, results as SurveyItem[]);

        agreggatedResults = userSurveyService.filterSurveyDataByDateRange(agreggatedResults, startDate, endDate);
        agreggatedResults = userSurveyService.groupSurveyData(agreggatedResults, groupBy);

        return agreggatedResults;
      }
    } catch (error) {
      throw new Error(`Erro ao receber os itens`);
    }
  };

  saveSurveysInCache = async () => {
    try {
      const userSurveyRepository = new UserSurveyRepository();
      const results = await userSurveyRepository.getEvolutionTime();

      const formatted = results.map((r: any) => ({
        origin: r.origin,
        period: r.period,
        total: Number(r.total),
        converted: Number(r.converted),
        conversionRate: r.total > 0 ? parseFloat(((r.converted / r.total) * 100).toFixed(1)) : 0,
      }));

      await addToArrayInRedis("key_usersSurveysResponse", formatted);

      return "Dados inseridos com sucesso no redis";
    } catch (error) {
      throw new Error(`Erro ao inserir os itens no redis`);
    }
  };
}
