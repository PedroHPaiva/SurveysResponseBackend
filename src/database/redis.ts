import { Redis } from "@upstash/redis";

export async function redisConnection() {
  const cache = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
  });

  return cache;
}
