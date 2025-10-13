import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail} from "class-validator";

export class RegisterDto {
    @IsEmail({},{message: 'Pleas provide a valid email'})
    email: string;

    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name must be a string'})
    @MinLength(3, {message: 'Name must be at least 3 characters long'})
    @MaxLength(25, {message: 'Name can not be longer than 25 characters'})
    name: string;

    @IsNotEmpty({message: 'Passwords is required'})
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    password: string;
}