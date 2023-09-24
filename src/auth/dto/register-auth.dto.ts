import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {

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
    example: 'D@vid1489',
    description:'Debe tener una letra mayuscula, una minuscula, un caracter especial y un numero',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
