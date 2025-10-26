import {
    Controller,
    Get,
    Post,
    Delete,
    Put,
    Body,
    Param,
    Query,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
    UseGuards
} from '@nestjs/common';
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post as PostEntity } from 'src/posts/entities/post.entity';
import { PostExistsPipe } from 'src/pipes/post-exists.pipe'
import {JwtAuthGuards} from "../auth/guards/jwt-auth.guards";
import {CurrentUser} from "../auth/decorators/current-user.decorators";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
import { PaginatedResponse } from "../common/interfaces/paginated-response.interface";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    findAll(
      @Query() query: FindPostsQueryDto
    ): Promise<PaginatedResponse<PostEntity>> {
        return this.postsService.findAll(query);
    }

    @UseGuards(JwtAuthGuards)
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createPostData: CreatePostDto, @CurrentUser() user: any): Promise<PostEntity> {
        return this.postsService.create(createPostData, user);
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe, PostExistsPipe) id: number
    ): Promise<PostEntity> {
        return this.postsService.findOne(id);
    }

    @UseGuards(JwtAuthGuards)
    @Put(':id/edit')
    update(
        @Param('id', ParseIntPipe, PostExistsPipe) id: number,
        @Body() updatePostData: UpdatePostDto,
        @CurrentUser() user: any
    ): Promise<PostEntity> {
        return this.postsService.update(id, updatePostData, user);
    }

    @UseGuards(JwtAuthGuards)
    @Delete(':id/delete')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('id', ParseIntPipe, PostExistsPipe) id: number,
        @CurrentUser() user: any
    ): Promise<void> {
        return this.postsService.remove(id, user);
    }
}
