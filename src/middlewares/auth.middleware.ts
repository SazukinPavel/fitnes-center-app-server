import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '../services/jwt.service';
import AppRequest from '../types/AppRequest';
import Auth from '../entities/auth.entity';
import { ClientsService } from '../clients/clients.service';
import { ManagersService } from '../managers/managers.service';
import { AdminsService } from '../admins/admins.service';
import JwtAuthPayload from '../types/JwtAuthPayload';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private clientsService: ClientsService,
    private managerService: ManagersService,
    private adminsService: AdminsService,
    private jwtServise: JwtService,
  ) {}

  getUserByAuth(auth: Auth) {
    switch (auth.role) {
      case 'client': {
        return this.clientsService.getByAuthId(auth.id);
      }
      case 'manager': {
        return this.managerService.getByAuthId(auth.id);
      }
      case 'admin': {
        return this.adminsService.getByAuthId(auth.id);
      }
    }
  }

  async use(req: AppRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      try {
        const parsedToken = this.jwtServise.verifyToken(token);
        const auth: Auth = await this.authService.getAuthByIdAndRole({
          id: parsedToken.data.id,
          role: parsedToken.data.role,
        });

        req.auth = auth;
        req.user = this.getUserByAuth(auth);
      } catch {}
    }
    next();
  }
}
