import Auth from "../entities/auth.entity";

export default class AppRequest extends Response {
  auth: Auth;
  user: any;
}
