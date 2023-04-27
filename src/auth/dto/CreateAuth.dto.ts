import Role from '../../types/Role';

export default class CreateAuthDto {
  role: Role;

  fio: string;

  login: string;

  password: string;

  birthDate?: Date;

  telephone: string;
}
