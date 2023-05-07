import { IsJWT, IsString } from 'class-validator';

export default class RecreatePasswordDto {
  @IsString()
  password: string;

  @IsJWT()
  token: string;
}
