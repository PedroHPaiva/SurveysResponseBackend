import { UsersTable } from "../models/Users";

interface CreateUserObj {
  email: string;
  password: string;
}

interface GetUserObj {
  email: string;
}

interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
}

export class UsersRepository {
  createNewUser = async ({ email, password }: CreateUserObj) => {
    const response = await UsersTable.create({ email, password });
    return response;
  };

  getUser = async ({ email }: GetUserObj): Promise<User | null> => {
    const response = await UsersTable.findOne({
      raw: true,
      where: { email },
    });

    return response as User | null;
  };
}
