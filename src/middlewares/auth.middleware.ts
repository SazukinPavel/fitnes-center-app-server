import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '../services/jwt.service';
import AppRequest from '../types/AppRequest';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private jwtServise: JwtService,
  ) {}

  async use(req: AppRequest, res: Response, next: NextFunction) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token) {
      try {
        const parsedToken = this.jwtServise.verifyToken(token);
        const realUser = await this.authService.getUser(parsedToken.login);
        req.user = realUser;
        req.role = realUser.role;
      } catch {}
    }
    next();
  }
}