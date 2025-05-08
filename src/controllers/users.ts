import * as Yup from "yup";
import { hash } from "bcryptjs";

import { userCredentialsValidation } from "../validators/credentials";
import { UsersRepository } from "../repositories/production/users";
import { CreateUserParameters } from "../types/Users";
import { CreateUserError } from "../errors/createUserError";

export class Users {
  createUser = async ({ email, password }: CreateUserParameters) => {
    try {
      await userCredentialsValidation.validate({ email, password }, { abortEarly: false });
      const usersRepository = new UsersRepository();

      const PasswordHash = await hash(password, 8);

      const user = await usersRepository.createNewUser({ email, password: PasswordHash });
      return user;
    } catch (err) {
      if (err instanceof Yup.ValidationError) throw new Error(err.message);
      throw new CreateUserError(email);
    }
  };
}
