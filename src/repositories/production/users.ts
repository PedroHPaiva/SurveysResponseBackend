import { UsersFunctions } from "../usersFunctions";
import { UsersTable } from "../../models/Users";
import { User, CreateUserParameters, GetUserParameters } from "../../types/Users";

export class UsersRepository implements UsersFunctions {
  createNewUser = async ({ email, password }: CreateUserParameters): Promise<User> => {
    const response = await UsersTable.create({ email, password });
    return response.get({ plain: true }) as User;
  };

  getUser = async ({ email }: GetUserParameters): Promise<User | null> => {
    const response = await UsersTable.findOne({
      raw: true,
      where: { email },
    });

    return response as User | null;
  };
}
