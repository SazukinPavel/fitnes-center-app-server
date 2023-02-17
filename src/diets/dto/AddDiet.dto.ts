import { IsString } from 'class-validator';

export default class AddDietDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
}
