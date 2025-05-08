export interface Survey {
  origin: string;
  period: string;
  total: number;
  converted: number;
}

export interface SurveyFinalObject {
  origin: string;
  period: string;
  total: number;
  converted: number;
  conversionRate: number;
}

export interface GetevolutionParameters {
  startDate: string;
  endDate: string;
  format?: string;
  groupBy?: string;
}
