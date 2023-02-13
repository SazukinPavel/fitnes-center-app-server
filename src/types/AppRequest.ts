import Role from './Role';
import { User } from '../entities/user.entity';
import Auth from '../entities/auth.entity';

export default class AppRequest extends Response {
  role: Role;
  user: User | Auth;
}
