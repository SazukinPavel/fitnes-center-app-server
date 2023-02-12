import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Auth from '../entities/auth.entity';
import { JwtService } from '../services/jwt.service';
import { ClientsModule } from '../clients/clients.module';
import { AdminsModule } from '../admins/admins.module';
import { ManagersModule } from '../managers/managers.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [
    TypeOrmModule.forFeature([Auth]),
    ClientsModule,
    AdminsModule,
    ManagersModule,
  ],
})
export class AuthModule {}
