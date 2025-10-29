import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: configService.get<string>('cloudinaryName'),
      api_key: configService.get<string>('cloudinaryApiKey'),
      api_secret: configService.get<string>('cloudinaryApiSecret'),
    });
    return cloudinary;
  },
  inject: [ConfigService],
};
