import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '../services/jwt.service';
import AppRequest from '../types/AppRequest';
import { JwtPayload } from 'jsonwebtoken';
import Auth from '../entities/auth.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private jwtServise: JwtService,
  ) {}

  async use(req: AppRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      try {
        const parsedToken: { data: Auth } = this.jwtServise.verifyToken(
          token,
        ) as { data: Auth };

        const realUser = await this.authService.getAuthByIdAndRole({
          id: parsedToken.data.id,
          role: parsedToken.data.role,
        });

        req.user = realUser;
        req.role = realUser.role;
      } catch {}
    }
    next();
  }
}
