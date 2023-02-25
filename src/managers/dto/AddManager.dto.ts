import { IsNumber, IsString, Min, Max } from 'class-validator';

export default class AddManagerDto {
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

  @IsString()
  description:string
}
