import { Injectable, NotFoundException } from '@nestjs/common';
//import { Post } from 'src/interfaces/posts.interfaces';
import { Post } from './entities/post.entity';
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ){}

    async findAll(search?: string): Promise<Post[]> {
        return await this.postsRepository.find();
    }

    async findOne(id: number): Promise<Post> {
        const singlePost = await this.postsRepository.findOneBy({id});
        if (!singlePost) {
            throw new NotFoundException(`Post with #${id} not found`);
        }
        return singlePost;
    }

    async create(createPostData: CreatePostDto): Promise<Post> {
        const newPost = this.postsRepository.create({
            title: createPostData.title,
            content: createPostData.content,
            authorName: createPostData.authorName,
        });
        return this.postsRepository.save(newPost)
    }

    async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
        const postToUpdate = await this.findOne(id);
        ['title', 'content', 'authorName'].forEach(prop => {
            const newValue = updatePostData[prop];
            if (newValue) {
                postToUpdate[prop] = newValue;
            }
        })
        return this.postsRepository.save(postToUpdate)
    }

    async remove(id: number) : Promise<void> {
        const postToRemove = await this.findOne(id);
        await this.postsRepository.remove(postToRemove);
    }
}
