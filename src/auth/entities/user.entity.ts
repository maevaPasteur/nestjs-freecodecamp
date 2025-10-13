import { Column, Entity, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Post } from 'src/posts/entities/post.entity';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    password: string; // hash the password

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @OneToMany(() => Post, (post) => post.authorName)
    posts: Post[];

    @CreateDateColumn()
    updatedAt: Date;

    @UpdateDateColumn()
    createdAt: Date;
}