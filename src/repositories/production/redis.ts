import { RedisFunctions } from "../redisFunctions";
import { redisConnection } from "../../database/redis";
import { SurveyFinalObject } from "../../types/Surveys";

export class RedisRepository implements RedisFunctions {
  async getArrayFromRedis(key: string): Promise<SurveyFinalObject[] | null> {
    const redisClient = await redisConnection();
    const data: string | null = await redisClient.get(key);

    if (!data) return [];

    try {
      let parsed;

      if (typeof data === "string") {
        parsed = JSON.parse(data);
      } else {
        parsed = data; // já é objeto
      }

      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        console.warn(`[REDIS] A chave ${key} não contém um array.`);
        return [];
      }
    } catch (err) {
      console.error(`[REDIS] Erro ao parsear o JSON da chave ${key}:`, err);
      return [];
    }
  }

  async addToArrayInRedis(key: string, newItems: SurveyFinalObject | SurveyFinalObject[]): Promise<SurveyFinalObject[]> {
    const redisClient = await redisConnection();
    const itemsToAdd = Array.isArray(newItems) ? newItems : [newItems];

    await redisClient.set(key, JSON.stringify(itemsToAdd));
    return itemsToAdd;
  }
}
