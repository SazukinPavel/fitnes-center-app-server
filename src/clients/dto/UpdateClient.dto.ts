import { IsString, IsUUID } from 'class-validator';

export default class UpdateClientDto {
  @IsUUID()
  id: string;
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
