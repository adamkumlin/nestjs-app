import {
  IsDateString,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  @IsLowercase()
  name: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  profileImage?: string;

  @IsNotEmpty()
  @IsDateString()
  joinDate: string;
}
