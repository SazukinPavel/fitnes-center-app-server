import {  IsString, } from 'class-validator';

export default class PatchDescriptionDto {
  @IsString()
  id: string;

  @IsString()
  description:string
}
