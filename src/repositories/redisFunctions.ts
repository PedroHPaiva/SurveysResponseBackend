import { SurveyFinalObject } from "../types/Surveys";

export interface RedisFunctions {
  getArrayFromRedis(key: string): Promise<SurveyFinalObject[] | null>;
  addToArrayInRedis(key: string, newItems: SurveyFinalObject | SurveyFinalObject[]): Promise<SurveyFinalObject[]>;
}
