import { IsNumber, IsString, IsUUID } from 'class-validator';

export default class UpdateManagerDto {
  @IsUUID()
  id: string;

  @IsString()
  fio?: string;

  @IsString()
  description?: string;

  @IsString()
  authId: string;

  telephone: string;
}
