import { Pagination } from "../../http/http.types";

export interface User {
  username: string;
  name: string;
  email: string;
}

export interface ListUsersFilters extends Partial<User> {
  pagination?: Pagination<keyof User>;
}
