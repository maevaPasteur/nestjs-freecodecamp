import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail} from "class-validator";

export class LoginDto {
    @IsEmail({},{message: 'Pleas provide a valid email'})
    email: string;

    @IsNotEmpty({message: 'Passwords is required'})
    password: string;
}