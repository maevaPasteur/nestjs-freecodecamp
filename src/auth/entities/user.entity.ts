import { Column, Entity, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Post } from 'src/posts/entities/post.entity';
import {Exclude, Expose} from "class-transformer";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity()
export class User {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({unique: true})
    email: string;

    @Expose()
    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @Expose()
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Expose()
    @OneToMany(() => Post, (post) => post.authorName)
    posts: Post[];

    @Expose()
    @CreateDateColumn()
    updatedAt: Date;

    @Expose()
    @UpdateDateColumn()
    createdAt: Date;
}