import { hash } from "bcryptjs";

import { UsersRepository } from "../repositories/usersRepository";

interface CreateUser {
  email: string;
  password: string;
}

export class Users {
  createUser = async ({ email, password }: CreateUser) => {
    try {
      const usersRepository = new UsersRepository();

      const PasswordHash = await hash(password, 8);

      const user = await usersRepository.createNewUser({ email, password: PasswordHash });
      return user;
    } catch (error) {
      throw new Error(`Erro ao criar usuário de email ${email}`);
    }
  };
}
