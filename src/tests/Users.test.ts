import { InMemoryUsersRepository } from "../repositories/inMemory/users";

describe("InMemoryUsersRepository", () => {
  let repo: InMemoryUsersRepository;

  beforeEach(() => {
    repo = new InMemoryUsersRepository();
  });

  it("deve criar um novo usuário", async () => {
    const user = await repo.createNewUser({
      email: "test@example.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("123456");
    expect(user.created_at).toBeInstanceOf(Date);
    expect(repo.items.length).toBe(1);
  });

  it("deve buscar um usuário pelo e-mail", async () => {
    await repo.createNewUser({
      email: "findme@example.com",
      password: "pass",
    });

    const user = await repo.getUser({ email: "findme@example.com" });

    expect(user).not.toBeNull();
    expect(user?.email).toBe("findme@example.com");
  });

  it("deve retornar null se o usuário não existir", async () => {
    const user = await repo.getUser({ email: "notfound@example.com" });

    expect(user).toBeNull();
  });

  it("deve permitir múltiplos usuários", async () => {
    await repo.createNewUser({ email: "a@example.com", password: "a" });
    await repo.createNewUser({ email: "b@example.com", password: "b" });

    expect(repo.items.length).toBe(2);
  });
});
