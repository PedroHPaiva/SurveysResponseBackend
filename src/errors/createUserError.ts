export class CreateUserError extends Error {
  constructor(email: string) {
    super(`Erro ao criar usuário de email ${email}`);
  }
}
