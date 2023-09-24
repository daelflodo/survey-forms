import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const userFound = await this.authRepository.findOne({
      where: { username: registerAuthDto.username },
    });
    if (userFound) throw new ConflictException('El usuario ya existe');
    const hashedPassword = await hash(password, 10);
    registerAuthDto = { ...registerAuthDto, password: hashedPassword };
    return this.authRepository.save(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { password, username } = loginAuthDto;
    const userFound = await this.authRepository.findOne({
      where: { username },
    });
    if (!userFound) throw new NotFoundException('Usuario no encontrado.');
    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales invalidas');
      const payload = { id: userFound.id, name: userFound.username };
      const token = this.jwtService.sign(payload);
      const data = {
        userFound,
        token,
      };
      return data;
    return 'This action adds a new auth';
  }
}
