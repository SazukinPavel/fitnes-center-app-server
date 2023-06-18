import { IsString } from "class-validator";

export default class UpdateDietDto {
  id: string;
  @IsString()
  description: string;
}
