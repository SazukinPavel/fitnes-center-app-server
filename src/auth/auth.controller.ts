import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { AuthService } from './auth.service';
import { GetUser, Roles } from 'src/decorators';
import { User } from 'src/entities/user.entity';
import { RolesGuard } from 'src/guards/auth.guard';

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
