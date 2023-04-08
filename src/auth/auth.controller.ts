import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from 'src/guards/auth.guard';
import { GetUser, Roles } from '../decorators';
import { User } from '../types/User';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('me')
  @Roles('user')
  me(@GetUser() user: User) {
    return this.authService.getAuthorize(user);
  }
}
