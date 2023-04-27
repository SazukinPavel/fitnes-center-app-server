import { IsString, IsUUID } from 'class-validator';

export default class AddCancellationDto {
  exerciseId: string;

  @IsString()
  reason: string;

  @IsString()
  by: string;
}
