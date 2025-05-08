export interface CreateUserParameters {
  email: string;
  password: string;
}

export interface GetUserParameters {
  email: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
}
