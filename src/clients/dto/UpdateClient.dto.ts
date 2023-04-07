import {IsNumber, IsString} from 'class-validator';

export default class UpdateClientDto {
  @IsNumber()
  id: string;

  @IsString()
  fio: string;

  @IsNumber()
  weight: string;

  @IsNumber()
  height: number;
}
