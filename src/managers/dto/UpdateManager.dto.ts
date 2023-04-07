import {IsNumber, IsString} from 'class-validator';

export default class UpdateManagerDto {
  @IsNumber()
  id: string;

  @IsString()
  fio?: string;

  @IsString()
  description?: string;
}
