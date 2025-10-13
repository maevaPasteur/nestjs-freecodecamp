import { Controller, Get, Post, Delete, Put, Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post as PostEntity } from 'src/posts/entities/post.entity';
import { PostExistsPipe } from 'src/pipes/post-exists.pipe'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    findAll(): Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createPostData: CreatePostDto): Promise<PostEntity> {
        return this.postsService.create(createPostData);
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe, PostExistsPipe) id: number
    ): Promise<PostEntity> {
        return this.postsService.findOne(id);
    }

    @Put(':id/edit')
    update(
        @Param('id', ParseIntPipe, PostExistsPipe) id: number,
        @Body() updatePostData: UpdatePostDto
    ): Promise<PostEntity> {
        return this.postsService.update(id, updatePostData);
    }

    @Delete(':id/delete')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe, PostExistsPipe) id: number): Promise<void> {
        return this.postsService.remove(id);
    }
}
