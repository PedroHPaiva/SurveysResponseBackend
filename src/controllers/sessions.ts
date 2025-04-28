import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { JWT_SECRET, EXPIRES } from "../constants/utils";

import { UsersRepository } from "../repositories/usersRepository";

interface CreateSessionObj {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
}

export class Sessions {
  createSession = async ({ email, password }: CreateSessionObj) => {
    try {
      const usersRepository = new UsersRepository();

      //Check if user existis
      const user: User | null = await usersRepository.getUser({ email });
      if (!user) throw new Error("E-mail/Password incorretos.");

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) throw new Error("E-mail/Password incorretos.");

      if (!JWT_SECRET) throw new Error("JWT_SECRET não está definido!");

      // User is authenticated
      const token = sign({}, JWT_SECRET, {
        subject: user.id.toString(),
        expiresIn: EXPIRES,
      });

      return { email: user.email, created_at: user.created_at, token };
    } catch (error) {
      console.log(error);
      throw new Error(`Erro ao criar a sessão para o usuário ${email}`);
    }
  };
}
