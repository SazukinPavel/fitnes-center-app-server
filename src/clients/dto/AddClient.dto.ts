import { IsDate, IsString } from 'class-validator';

export default class AddClientDto {
  @IsString()
  fio: string;
  @IsString()
  password: string;
  @IsString()
  login: string;

  @IsDate()
  birthDate: Date;

  weight: string;

  height: number;

  age: number;
}
