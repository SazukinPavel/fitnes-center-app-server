import { User } from '../../entities/user.entity';

export default class AuthorizeReponseDto {
  token: string;
  user: User;
}
