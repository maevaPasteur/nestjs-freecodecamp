import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {Post} from './entities/post.entity';
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User, UserRole} from "../auth/entities/user.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { Cache } from "cache-manager";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
import { PaginatedResponse } from "../common/interfaces/paginated-response.interface";

@Injectable()
export class PostsService {

    private postListCacheKeys: Set<string> = new Set();

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    private generatePostListCacheKey(query: FindPostsQueryDto): string {
        const { page = 1, limit = 10, title, order, sortBy } = query;
        const key = `posts_list_page${page}_limit${limit}_title${title||'all'}_order${order}_sortBy${sortBy||'all'}`;
        this.postListCacheKeys.add(key);
        return key;
    }

    private generatePostCacheKey(id): string {
        return `post_${id}`;
    }

    private async resetPostListFromCache() {
        for (const key of this.postListCacheKeys) {
            await this.cacheManager.del(key);
        }
        this.postListCacheKeys.clear();
    }

    private async updatePostInCache(post: Post) {
        if (!post) return;
        await Promise.all(
          [...this.postListCacheKeys].map(async (key) => {
              const cached: any = await this.cacheManager.get(key);
              if (!cached?.items?.length) return;
              const hasPost = cached.items.some(p => p.id === post.id);
              if (!hasPost) return;
              const dataWithUpdatedPost = {
                  ...cached,
                  items: cached.items.map(p => (p.id === post.id ? { ...p, ...post } : p)),
              };
              await this.cacheManager.set(key, dataWithUpdatedPost);
          })
        );
    }

    async findAll(query: FindPostsQueryDto): Promise<PaginatedResponse<Post>> {
        const cacheKey = this.generatePostListCacheKey(query);
        this.postListCacheKeys.add(cacheKey);

        const cachedData = await this.cacheManager.get<PaginatedResponse<Post>>(cacheKey);
        if (cachedData) {
            console.log(`Cache Hit ---------> Returning posts list from Cache ${cacheKey}`);
            return cachedData;
        }

        console.log('Cache Miss ---------> Returning posts list from database');
        const { page = 10, limit = 10, title, order, sortBy } = query;
        const skip = (page - 1) * limit;
        const queryBuilder = this.postsRepository.createQueryBuilder('post')
          .leftJoinAndSelect('post.authorName', 'authorName')
          .orderBy(`post.${sortBy}`, order)
          .skip(skip)
          .take(limit);
        if (title) {
            queryBuilder.andWhere('post.title ILIKE :title', {title: `%${title}`})
        }
        const [items, totalItems] = await queryBuilder.getManyAndCount();
        const totalPages = Math.ceil(totalItems/limit);
        const responseResult = {
            items,
            pagination: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasPreviousPage: page > 1,
                hasNextPage: page < totalPages,
            }
        };
        await this.cacheManager.set(cacheKey, responseResult, 30000);
        return responseResult;
    }

    async findOne(id: number): Promise<Post> {
        const cacheKey = this.generatePostCacheKey(id);
        const cachedPost = await this.cacheManager.get<Post>(cacheKey);
        if (cachedPost) {
            console.log(`Cache Hit ---------> Returning post from Cache ${cacheKey}`);
            return cachedPost;
        }

        console.log('Cache Miss ---------> Returning post from database');
        const singlePost = await this.postsRepository.findOne({
            where: {id},
            relations: ['authorName']
        });
        if (!singlePost) {
            throw new NotFoundException(`Post with #${id} not found`);
        }

        await this.cacheManager.set(cacheKey, singlePost, 30000);
        return singlePost;
    }

    async create(createPostData: CreatePostDto, authorName: User): Promise<Post> {
        const postData = this.postsRepository.create({
            title: createPostData.title,
            content: createPostData.content,
            authorName
        });
        const newPost = await this.postsRepository.save(postData);
        const cacheKey = this.generatePostCacheKey(newPost.id);
        await this.cacheManager.set(cacheKey, newPost);
        this.resetPostListFromCache();
        return newPost;
    }

    async update(id: number, updatePostData: UpdatePostDto, user: User): Promise<Post> {
        const postToUpdate = await this.findOne(id);
        if (postToUpdate.authorName?.id !== user?.id) {
            throw new ForbiddenException('You can only update your own posts')
        }
        ['title', 'content'].forEach(prop => {
            const newValue = updatePostData[prop];
            if (newValue) {
                postToUpdate[prop] = newValue;
            }
        })
        const postUpdated = await this.postsRepository.save(postToUpdate);
        const cacheKey = this.generatePostCacheKey(postUpdated.id);
        await this.cacheManager.set(cacheKey, postUpdated);
        this.updatePostInCache(postUpdated);
        return postUpdated;
    }

    async remove(id: number, user: User) : Promise<void> {
        const postToRemove = await this.findOne(id);
        if (user.role !== UserRole.ADMIN && user.id !== postToRemove.authorName?.id) {
            throw new ForbiddenException('You are not allowed to delete this post')
        }
        await this.postsRepository.remove(postToRemove);
        await this.resetPostListFromCache();
    }
}
