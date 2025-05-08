import { Survey, GetevolutionParameters } from "../types/Surveys";

export interface SurveysFunctions {
  getEvolutionTime(): Promise<Survey[]>;
  getEvolutionTimePerPeriod({ startDate, endDate, format }: GetevolutionParameters): Promise<Survey[]>;
}
