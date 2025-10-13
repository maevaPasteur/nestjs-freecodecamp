import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    title: string;

    @Column({type: 'text'})
    content: string;

    @Column()
    authorName: string;

    @CreateDateColumn()
    updatedAt: Date;

    @UpdateDateColumn()
    createdAt: Date;
}