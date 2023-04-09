import { IsString } from 'class-validator';

export default class ChangePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
