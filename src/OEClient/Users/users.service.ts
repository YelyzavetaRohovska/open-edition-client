import { Post } from "../../http";
import { ListUsersFilters, User } from "./users.types";

export class UserService  {
  private baseUrl: string;
  private token: string;

  constructor({ baseUrl, token }: { baseUrl: string; token: string }) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async getUserList(filterOpt: ListUsersFilters = { pagination: { take: 500 } }): Promise<User[]> {
    const usersPayload = await Post<{ userRecords: User[], numRecords: number }, ListUsersFilters>({
      endpoint: `${this.baseUrl}/api/functions/User/List`,
      token: this.token,
    }, filterOpt);

    return usersPayload.userRecords;
  }

  async getUserById(id: string): Promise<User> {
    if (!id) {
      throw new Error('Missing required param id');
    }

    const { user } = await Post<{ user: User | null }, { id: string }>({
      endpoint: `${this.baseUrl}/api/functions/User/Get`,
      token: this.token,
    }, { id });

    if (!user) {
      throw new Error('User is not found');
    }
    
    return {
      name: user.name,
      username: user.username,
      email: user.email,
    };
  }
}
