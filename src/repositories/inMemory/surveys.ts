import moment from "moment";

import { SurveysFunctions } from "../surveysFunctions";
import { Survey, GetevolutionParameters } from "../../types/Surveys";

export class InMemorySurveysRepository implements SurveysFunctions {
  public SurveysFormatHour: Survey[] = [
    {
      origin: "email",
      period: "2025-04-27 01:00",
      total: 45060,
      converted: 2500,
    },
    {
      origin: "MOBILE",
      period: "2025-04-27 01:00",
      total: 10000,
      converted: 1324,
    },
    {
      origin: "email",
      period: "2025-04-27 02:00",
      total: 1032762,
      converted: 8700,
    },
    {
      origin: "MOBILE",
      period: "2025-04-27 02:00",
      total: 516788,
      converted: 3316,
    },
  ];

  public SurveysFormatDay: Survey[] = [
    {
      origin: "email",
      period: "2025-04-27",
      total: 90060,
      converted: 12500,
    },
    {
      origin: "MOBILE",
      period: "2025-04-27",
      total: 190000,
      converted: 20400,
    },
    {
      origin: "email",
      period: "2025-04-28",
      total: 1032762,
      converted: 8700,
    },
    {
      origin: "MOBILE",
      period: "2025-04-28",
      total: 516788,
      converted: 3316,
    },
  ];

  public SurveysFormatMonth: Survey[] = [
    {
      origin: "email",
      period: "2025-04",
      total: 74000,
      converted: 6200,
    },
    {
      origin: "MOBILE",
      period: "2025-05",
      total: 89000,
      converted: 20400,
    },
  ];

  getEvolutionTime = async (): Promise<Survey[]> => {
    try {
      return this.SurveysFormatHour;
    } catch (err) {
      throw new Error(`Erro ao receber os itens por evolução de itens`);
    }
  };

  getEvolutionTimePerPeriod = async ({ startDate, endDate, format }: GetevolutionParameters): Promise<Survey[]> => {
    try {
      if (format === "hour") return this.filterItemsByDateRange(this.SurveysFormatHour, startDate, endDate);
      if (format === "day") return this.filterItemsByDateRange(this.SurveysFormatDay, startDate, endDate);
      if (format === "month") return this.filterItemsByDateRange(this.SurveysFormatMonth, startDate, endDate);

      throw new Error(`Erro ao receber os itens por evolução de itens`);
    } catch (err) {
      throw new Error(`Erro ao receber os itens por evolução de itens`);
    }
  };

  private filterItemsByDateRange(items: Survey[], startDate: string, endDate: string) {
    const start = moment(startDate);
    const end = moment(endDate);

    return items.filter((item) => {
      const itemDate = moment(item.period);
      return itemDate.isBetween(start, end, null, "[]");
    });
  }
}
