import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { Repository } from "typeorm";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { User } from "../auth/entities/user.entity";
import type { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class FileUploadService {

  private filesCacheKey: string = 'files-upload-all';

  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async uploadFile(file: Express.Multer.File, description: string|undefined, user: User): Promise<File> {
    if (!file) {
      throw new BadRequestException('File is required')
    }
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
    const newFile = this.fileRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      publicId: cloudinaryResponse?.public_id,
      url: cloudinaryResponse?.secure_url,
      description,
      uploader: user
    });
    const createdFile = await this.fileRepository.save(newFile);

    const filesFromCache: File[]|undefined = await this.cacheManager.get(this.filesCacheKey);
    if (filesFromCache) {
      const updatedFiles = [createdFile, ...filesFromCache];
      await this.cacheManager.set(this.filesCacheKey, updatedFiles);
    }

    return createdFile;
  }

  async findAll(): Promise<File[]> {

    const filesFromCache: File[]|undefined = await this.cacheManager.get(this.filesCacheKey);
    if (filesFromCache) {
      console.log(`Cache Hit ---------> Returning files list from Cache`);
      return filesFromCache;
    }
    console.log(`Cache Miss ---------> Returning files list from database`);

    const files = this.fileRepository.find({
      relations: ['uploader'],
      order: {createdAt: 'DESC'}
    });
    await this.cacheManager.set(this.filesCacheKey, files);
    return files;
  }

  async findOne(id: string): Promise<File> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const file = await this.fileRepository.findOne({where: {id}});
    if (!file) {
      throw new NotFoundException({message: `File with ID ${id} not found`})
    }
    return file;
  }

  async remove(id: string): Promise<void> {
    const file = await this.fileRepository.findOne({
      where: {id}
    });
    if (!file) {
      throw new NotFoundException({message: `File with ID ${id} not found`})
    }
    await this.cloudinaryService.deleteFile(file.publicId);

    const filesFromCache: File[]|undefined = await this.cacheManager.get(this.filesCacheKey);
    if (filesFromCache) {
      const updatedCache = filesFromCache.filter(f => f.id !== file.id);
      await this.cacheManager.set(this.filesCacheKey, updatedCache);
    }

    await this.fileRepository.remove(file);
  }
}
