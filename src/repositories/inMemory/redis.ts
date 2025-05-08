import { RedisFunctions } from "../redisFunctions";
import { SurveyFinalObject } from "../../types/Surveys";

export class InMemoryRedisRepository implements RedisFunctions {
  public items: SurveyFinalObject[] = [];

  async getArrayFromRedis(key: string): Promise<SurveyFinalObject[] | null> {
    const redisItems = this.items;
    if (!redisItems) return null;
    return redisItems;
  }

  async addToArrayInRedis(key: string, newItems: SurveyFinalObject | SurveyFinalObject[]): Promise<SurveyFinalObject[]> {
    const itemsToAdd = Array.isArray(newItems) ? newItems : [newItems];

    for (let item of itemsToAdd) {
      this.items.push(item);
    }

    return itemsToAdd;
  }
}
