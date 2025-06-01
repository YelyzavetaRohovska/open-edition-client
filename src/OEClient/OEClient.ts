import { User, UserService } from "./Users";

export class OEClient {
  private baseUrl: string;
  private token: string;
  private userService: UserService;

  constructor({ host, port, token }: { host: string; port: number; token: string }) {
    this.baseUrl = `${host}:${port}`;
    this.token = token;
    this.userService = new UserService({ baseUrl: this.baseUrl, token: this.token });
  }

  async getUserList(): Promise<User[]> {
    return this.userService.getUserList();
  }

  async getUserById(id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
}
