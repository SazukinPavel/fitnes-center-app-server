import { IsNumber, IsString, IsUUID } from 'class-validator';

export default class UpdateClientDto {
  @IsUUID()
  id: string;

  @IsString()
  fio: string;

  @IsNumber()
  weight: string;

  @IsNumber()
  height: number;

  @IsString()
  authId: string;
}
