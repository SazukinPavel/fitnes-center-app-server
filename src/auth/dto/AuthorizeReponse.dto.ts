import { User } from '../../types/User';

export default class AuthorizeReponseDto {
  token: string;
  user: User;
}
