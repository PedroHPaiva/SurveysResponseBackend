import { UsersFunctions } from "../usersFunctions";
import { User, CreateUserParameters, GetUserParameters } from "../../types/Users";

export class InMemoryUsersRepository implements UsersFunctions {
  public items: User[] = [];

  async getUser({ email }: GetUserParameters): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    if (!user) return null;
    return user;
  }

  async createNewUser(data: CreateUserParameters): Promise<User> {
    const user = {
      id: this.items.length + 1,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
