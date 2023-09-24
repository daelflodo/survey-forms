import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
export class CreateSurveyDto {
  @ApiProperty({
    description:'Debe ser un string y no debe estar vacio',
    example: 'David Elias Flores'
  })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty({
    description:'Debe ser un string y no debe estar vacio',
    example: '+593098745689'
  })
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({
    description:'Debe ser un string y no debe estar vacio, debe respetar el formato Date ',
    example: '2023-09-22T14:30:00.000Z'
  })
  @IsString()
  @IsNotEmpty()
  readonly startDate: string;

  @ApiProperty({
    description:'Debe ser un string y no debe estar vacio',
    example: 'Ingles, Frances, Aleman o Español'
  })
  @IsString()
  @IsNotEmpty()
  readonly preferredLanguage: string;

  @ApiProperty({
    description:'Debe ser un string y no debe estar vacio',
    example: 'Amigos, Busqueda Online o Publicidad'
  })
  @IsString()
  @IsNotEmpty()
  readonly howFound: string;

  @ApiProperty({
    description:'Debe ser un Booleano y no debe estar vacio',
    example: true
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly newsletterSubscription: boolean;
}
