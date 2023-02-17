import { IsString, IsUUID } from 'class-validator';

export default class UpdateDietDto {
  @IsUUID()
  id: string;
  @IsString()
  description: string;
}
