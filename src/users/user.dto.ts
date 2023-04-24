import { IsEmail, IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsInt()
  age: number;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
