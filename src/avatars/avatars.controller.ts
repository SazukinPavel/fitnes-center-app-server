import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../configs/multer.config';
import { AvatarsService } from './avatars.service';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('owner') owner: string,
  ) {
    return this.avatarsService.add({ fileName: file.filename, owner });
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.avatarsService.delete(id);
  }
}
