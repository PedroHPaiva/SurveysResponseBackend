import { InMemoryRedisRepository } from "../repositories/inMemory/redis";

describe("InMemoryRedisRepository", () => {
  let redisRepo: InMemoryRedisRepository;

  beforeEach(() => {
    redisRepo = new InMemoryRedisRepository();
  });

  it("deve adicionar um item ao array do Redis", async () => {
    const newItem = {
      origin: "Google",
      period: "2024-Q1",
      total: 100,
      converted: 20,
      conversionRate: 0.2,
    };

    const result = await redisRepo.addToArrayInRedis("survey_key", newItem);

    expect(result).toHaveLength(1);
    expect(redisRepo.items).toContainEqual(newItem);
  });

  it("deve adicionar múltiplos itens ao array do Redis", async () => {
    const items = [
      {
        origin: "Google",
        period: "2024-Q1",
        total: 100,
        converted: 20,
        conversionRate: 0.2,
      },
      {
        origin: "Facebook",
        period: "2024-Q1",
        total: 80,
        converted: 10,
        conversionRate: 0.125,
      },
    ];

    const result = await redisRepo.addToArrayInRedis("survey_key", items);

    expect(result).toHaveLength(2);
    expect(redisRepo.items).toEqual(expect.arrayContaining(items));
  });

  it("deve retornar todos os itens do Redis", async () => {
    const item = {
      origin: "Instagram",
      period: "2024-Q2",
      total: 50,
      converted: 5,
      conversionRate: 0.1,
    };

    await redisRepo.addToArrayInRedis("any_key", item);

    const result = await redisRepo.getArrayFromRedis("any_key");

    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(item);
  });

  it("deve retornar array vazio se nada for adicionado", async () => {
    const result = await redisRepo.getArrayFromRedis("no_items");
    expect(result).toEqual([]);
  });
});
