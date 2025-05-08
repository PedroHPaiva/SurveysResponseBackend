import { User, CreateUserParameters, GetUserParameters } from "../types/Users";

export interface UsersFunctions {
  getUser({ email }: GetUserParameters): Promise<User | null>;
  createNewUser(data: CreateUserParameters): Promise<User>;
}
