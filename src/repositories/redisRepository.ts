import { openRedisConnection, closeRedisConnection } from "../database/redis";

interface SurveyData {
  origin: string;
  period: string;
  total: number;
  converted: number;
  conversionRate: number;
}

export async function getArrayFromRedis(key: string): Promise<any[]> {
  const redisClient = await openRedisConnection();
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
  } catch (error) {
    console.error(`[REDIS] Erro ao parsear o JSON da chave ${key}:`, error);
    return [];
  }
}

export async function addToArrayInRedis(key: string, newItems: SurveyData | SurveyData[]): Promise<void> {
  const redisClient = await openRedisConnection();
  const itemsToAdd = Array.isArray(newItems) ? newItems : [newItems];

  await redisClient.set(key, JSON.stringify(itemsToAdd));
}

// export async function getArrayFromRedis(key: string): Promise<any[]> {
//   const redisClient = await openRedisConnection();
//   const data = await redisClient.get(key);

//   if (!data) return [];

//   try {
//     const parsed = JSON.parse(data);
//     if (Array.isArray(parsed)) {
//       return parsed;
//     } else {
//       console.warn(`[REDIS] A chave ${key} não contém um array.`);
//       return [];
//     }
//   } catch (error) {
//     console.error(`[REDIS] Erro ao parsear o JSON da chave ${key}:`, error);
//     return [];
//   } finally {
//     await closeRedisConnection(redisClient);
//   }
// }

// export async function addToArrayInRedis(key: string, newItems: SurveyData | SurveyData[]): Promise<void> {
//   // Normaliza se newItems for só um objeto
//   const itemsToAdd = Array.isArray(newItems) ? newItems : [newItems];

//   const redisClient = await openRedisConnection();

//   // Salva de novo no Redis
//   await redisClient.set(key, JSON.stringify(itemsToAdd));

//   await closeRedisConnection(redisClient);
// }
