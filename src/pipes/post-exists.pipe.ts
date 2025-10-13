import { Injectable, NotFoundException, PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { PostsService } from "../posts/posts.service";

@Injectable()
export class PostExistsPipe implements PipeTransform {
    constructor(private readonly postService: PostsService) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        try {
            await this.postService.findOne(value);
        } catch (e) {
            throw new NotFoundException(`Post with id ${value} not found`)
        }
        return value;
    }
}