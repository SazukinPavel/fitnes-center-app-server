import { IsBoolean, IsString } from 'class-validator';

export default class UpdateIsPayed {
  @IsString()
  id: string;

  @IsBoolean()
  isPayed: boolean;
}
