import { IsNumber, IsString, Min, Max, IsUUID } from 'class-validator';

export default class UpdateManagerDto {
  id: string;

  @IsString()
  fio: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsNumber()
  @Min(18)
  @Max(65)
  age: number;
}
