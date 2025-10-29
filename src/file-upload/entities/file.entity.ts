import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Expose } from "class-transformer";

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  url: string;

  @Column()
  publicId: string;

  @Column({nullable: true})
  description: string;

  @ManyToOne(() => User, {eager: true})
  uploader: User;

  @CreateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;
}