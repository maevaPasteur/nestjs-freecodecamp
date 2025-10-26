import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import {User} from "../../auth/entities/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    title: string;

    @Column({type: 'text'})
    content: string;

    @ManyToOne(() => User, (user) => user.posts)
    authorName: User;

    @CreateDateColumn()
    updatedAt: Date;

    @UpdateDateColumn()
    createdAt: Date;
}