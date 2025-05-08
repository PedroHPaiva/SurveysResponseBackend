import { InMemorySurveysRepository } from "../repositories/inMemory/surveys";

describe("InMemorySurveysRepository", () => {
  let repository: InMemorySurveysRepository;

  beforeEach(() => {
    repository = new InMemorySurveysRepository();
  });

  it("should return surveys for the correct period in hour format", async () => {
    const startDate = "2025-04-27 01:00";
    const endDate = "2025-04-27 02:00";
    const result = await repository.getEvolutionTimePerPeriod({
      startDate,
      endDate,
      format: "hour",
    });

    expect(result).toHaveLength(4);
    expect(result[0].period).toBe("2025-04-27 01:00");
    expect(result[1].period).toBe("2025-04-27 01:00");
    expect(result[2].period).toBe("2025-04-27 02:00");
    expect(result[3].period).toBe("2025-04-27 02:00");
  });

  it("should return surveys for the correct period in day format", async () => {
    const startDate = "2025-04-27";
    const endDate = "2025-04-28";
    const result = await repository.getEvolutionTimePerPeriod({
      startDate,
      endDate,
      format: "day",
    });

    expect(result).toHaveLength(4);
    expect(result[0].period).toBe("2025-04-27");
    expect(result[1].period).toBe("2025-04-27");
    expect(result[2].period).toBe("2025-04-28");
    expect(result[3].period).toBe("2025-04-28");
  });

  it("should return surveys for the correct period in month format", async () => {
    const startDate = "2025-04";
    const endDate = "2025-05";
    const result = await repository.getEvolutionTimePerPeriod({
      startDate,
      endDate,
      format: "month",
    });

    expect(result).toHaveLength(2);
    expect(result[0].period).toBe("2025-04");
    expect(result[1].period).toBe("2025-05");
  });

  it("should return an empty array if no surveys match the date range in hour format", async () => {
    const startDate = "2025-04-28 01:00";
    const endDate = "2025-04-28 02:00";
    const result = await repository.getEvolutionTimePerPeriod({
      startDate,
      endDate,
      format: "hour",
    });

    expect(result).toHaveLength(0);
  });

  it("should throw an error for an unsupported format", async () => {
    const startDate = "2025-04-27";
    const endDate = "2025-04-28";

    await expect(
      repository.getEvolutionTimePerPeriod({
        startDate,
        endDate,
        format: "unsupportedFormat",
      })
    ).rejects.toThrowError("Erro ao receber os itens por evolução de itens");
  });

  // Testando a função getEvolutionTime
  it("should return surveys from the getEvolutionTime function", async () => {
    const result = await repository.getEvolutionTime();

    expect(result).toHaveLength(4);
    expect(result[0].period).toBe("2025-04-27 01:00");
    expect(result[1].period).toBe("2025-04-27 01:00");
    expect(result[2].period).toBe("2025-04-27 02:00");
    expect(result[3].period).toBe("2025-04-27 02:00");
  });
});
