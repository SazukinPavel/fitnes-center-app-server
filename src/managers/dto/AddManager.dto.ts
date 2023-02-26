import { IsNumber, IsString, Min, Max } from 'class-validator';

export default class AddManagerDto {
  fio: string;

  login: string;

  password: string;

  age: number;

  description:string
}
