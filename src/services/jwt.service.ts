import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtService {
  signToken(user: User) {
    return sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        data: { role: user.role, id: user.id },
      },
      process.env.JWT_KEY,
    );
  }

  verifyToken(token: string) {
    return verify(token, process.env.JWT_KEY);
  }
}
