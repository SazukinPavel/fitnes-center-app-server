import { IsString } from "class-validator";

export default class ForgetPasswordDto {
  @IsString()
  login: string;
}
