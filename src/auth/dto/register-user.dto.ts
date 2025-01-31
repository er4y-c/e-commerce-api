import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The name of the new user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The surname of the new user',
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    example: '05555555555',
    description: 'The phone number of the new user',
  })
  @IsPhoneNumber('TR')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'The email of the new user',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the new user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the new user',
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}
