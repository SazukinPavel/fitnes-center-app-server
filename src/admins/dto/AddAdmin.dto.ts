import { IsString } from "class-validator";

export default class AddAdminDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
