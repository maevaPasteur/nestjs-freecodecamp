import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus, Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileUploadService } from "./file-upload.service";
import { JwtAuthGuards } from "../auth/guards/jwt-auth.guards";
import { CurrentUser } from "../auth/decorators/current-user.decorators";
import { UploadFileDto } from "./dto/upload-file.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { File } from "./entities/file.entity";

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService
  ) {}

  @UseGuards(JwtAuthGuards)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
    @CurrentUser() user: any
  ): Promise<any> {
    return this.fileUploadService.uploadFile(file, uploadFileDto?.description, user);
  }

  @Get()
  findAll(): Promise<File[]> {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ): Promise<File> {
    return this.fileUploadService.findOne(id);
  }

  @Delete(':id')
  deleteOne(
    @Param('id') id: string
  ): Promise<void> {
    return this.fileUploadService.remove(id);
  }
}
