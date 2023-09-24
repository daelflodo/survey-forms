import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiracion: true,
      secretOrKey: process.env.JWT_SECRET || 'tu_secreto',
    });
  }
  async validate(payload: any) {
    return { userId: payload.id, name: payload.name };
  }
}