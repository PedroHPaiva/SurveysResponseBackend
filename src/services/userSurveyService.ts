import moment from "moment";

interface SurveyItem {
  origin: string;
  period: string; // Ex: '2025-04-27 01:00'
  total: number;
  converted: number;
  conversionRate: number;
}

export class UserSurveyService {
  mergeWithoutDuplicates(arr1: SurveyItem[], arr2: SurveyItem[]): SurveyItem[] {
    const merged = [...arr1, ...arr2];

    const seen = new Set<string>();
    const unique: SurveyItem[] = [];

    for (const item of merged) {
      const key = `${item.origin}_${item.period}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }

    return unique;
  }

  groupSurveyData(data: SurveyItem[], groupBy: string | undefined): SurveyItem[] {
    const grouped: { [key: string]: { [origin: string]: SurveyItem } } = {};

    data.forEach((item) => {
      let newPeriod: string;

      if (groupBy === "hour") {
        newPeriod = moment(item.period).format("YYYY-MM-DD HH:00");
      } else if (groupBy === "day") {
        newPeriod = moment(item.period).format("YYYY-MM-DD");
      } else if (groupBy === "month") {
        newPeriod = moment(item.period).format("YYYY-MM");
      } else {
        throw new Error(`Grouping "${groupBy}" inválido`);
      }

      if (!grouped[newPeriod]) {
        grouped[newPeriod] = {};
      }

      if (!grouped[newPeriod][item.origin]) {
        grouped[newPeriod][item.origin] = {
          origin: item.origin,
          period: newPeriod,
          total: 0,
          converted: 0,
          conversionRate: 0,
        };
      }

      grouped[newPeriod][item.origin].total += item.total;
      grouped[newPeriod][item.origin].converted += item.converted;
    });

    // Depois recalcula a taxa de conversão
    const result: SurveyItem[] = [];

    Object.values(grouped).forEach((origins) => {
      Object.values(origins).forEach((item) => {
        item.conversionRate = item.total > 0 ? +((item.converted / item.total) * 100).toFixed(1) : 0;
        result.push(item);
      });
    });

    return result;
  }

  formatSurveysResults(results: any): SurveyItem[] {
    return results.map((r: any) => ({
      origin: r.origin,
      period: r.period,
      total: Number(r.total),
      converted: Number(r.converted),
      conversionRate: r.total > 0 ? parseFloat(((r.converted / r.total) * 100).toFixed(1)) : 0,
    }));
  }

  filterSurveyDataByDateRange(data: SurveyItem[], startDate: string | Date, endDate: string | Date): SurveyItem[] {
    const start = moment(startDate);
    const end = moment(endDate).add(1, "days");

    return data.filter((item) => {
      const itemDate = moment(item.period);
      return itemDate.isBetween(start, end, undefined, "[]");
    });
  }
}
