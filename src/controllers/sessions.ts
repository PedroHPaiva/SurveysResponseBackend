import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { JWT_SECRET, EXPIRES } from "../constants/utils";
import { User } from "../types/Users";
import { CreateSessionsParameters } from "../types/Sessions";
import { UsersRepository } from "../repositories/production/users";

import { CredentialsError } from "../errors/credentialsError";

export class Sessions {
  createSession = async ({ email, password }: CreateSessionsParameters) => {
    try {
      const usersRepository = new UsersRepository();

      //Check if user existis
      const user: User | null = await usersRepository.getUser({ email });
      if (!user) throw new CredentialsError();

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) throw new CredentialsError();
      if (!JWT_SECRET) throw new CredentialsError();

      // User is authenticated
      const token = sign({}, JWT_SECRET, {
        subject: user.id.toString(),
        expiresIn: EXPIRES,
      });

      return { email: user.email, created_at: user.created_at, token };
    } catch (err) {
      throw err;
    }
  };
}
