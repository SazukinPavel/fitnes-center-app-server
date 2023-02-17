import { IsUUID } from 'class-validator';

export default class SetDietDto {
  @IsUUID()
  clientId: string;
  @IsUUID()
  dietId: string;
}
