import { IsString } from 'class-validator';

export default class AddClientDto {
  @IsString()
  fio: string;
  @IsString()
  password: string;
  @IsString()
  login: string;

  weight: string;

  height: number;

  age: number;
}
