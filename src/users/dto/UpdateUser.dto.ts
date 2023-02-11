import { IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  secondName: string;
  @IsString()
  lastName: string;
  @IsString()
  password: string;
  @IsString()
  login: string;
}
