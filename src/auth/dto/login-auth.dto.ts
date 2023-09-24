import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description:'No debe estar vacio',
    example: 'Dael',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description:'Debe tener una letra mayuscula, una minuscula, un caracter especial y un numero',
    example: 'D@vid1489',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}