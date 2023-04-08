import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Auth from '../entities/auth.entity';
import { JwtService } from '../services/jwt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [TypeOrmModule.forFeature([Auth])],
  exports: [AuthService],
})
export class AuthModule {}
