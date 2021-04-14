import { RESTDataSource } from 'apollo-datasource-rest';
import { config } from "dotenv";

config();
class userAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }
  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }
  async signUpUser(args){
    const user = await this.post("/user/signup", args);
    return user;
  }

  async loginUser(args) {
    const user = await this.post("/user/login", args);
    return user;
  }

  async getMe() {
    const user = await this.get("/user/getUser");
    return user;
  }
}

export default userAPI;
