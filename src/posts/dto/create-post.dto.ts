import { IsNotEmpty, IsString, MinLength, MaxLength} from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({message: 'title is required'})
    @IsString({message: 'title must be a string'})
    @MinLength(3, {message: 'title must be at least 3 characters long'})
    @MaxLength(50, {message: 'title can not be longer than 50 characters'})
    title: string

    @IsNotEmpty({message: 'content is required'})
    @IsString({message: 'content must be a string'})
    @MinLength(3, {message: 'content must be at least 3 characters long'})
    content: string
}