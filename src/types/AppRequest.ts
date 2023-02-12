import Role from './Role';
import { User } from '../entities/user.entity';

export default class AppRequest extends Response {
  role: Role;
  user: User;
}
