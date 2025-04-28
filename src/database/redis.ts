import { Redis } from "@upstash/redis";

export async function openRedisConnection() {
  const cache = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
  });

  return cache;
}

// export async function openRedisConnection() {
//   const cache = createClient({
//     socket: {
//       host: process.env.REDIS_SOCKET,
//       port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
//     },
//   });

//   cache.on("error", (err) => {
//     console.error(`[REDIS] Erro na conexão: ${err}`);
//   });

//   await cache.connect();

//   return cache;
// }

// Função para fechar a conexão com o Redis
export async function closeRedisConnection(cache: any): Promise<void> {
  if (cache) {
    await cache.quit();
  }
}
