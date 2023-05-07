import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from 'src/guards/auth.guard';
import { GetUser, Roles } from '../decorators';
import { User } from '../types/User';
import ChangePasswordDto from './dto/ChangePassword.dto';
import RecreatePasswordDto from './dto/RecreatePassword.dto';
import ForgetPasswordDto from './dto/ForgetPassword.dto';
import { RecreatePassService } from '../recreate-pass/recreate-pass.service';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly recreatePassService: RecreatePassService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('me')
  @Roles('user')
  me(@GetUser() user: User) {
    return this.authService.getAuthorize(user);
  }

  @Post('change-pass')
  @Roles('client', 'manager')
  changePassword(@GetUser() user: User, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(user, dto);
  }

  @Post('forget')
  forgetPassword(@Body() dto: ForgetPasswordDto) {
    return this.authService.forgetPassword(dto);
  }

  @Post('new-password')
  recreatePassword(@Body() dto: RecreatePasswordDto) {
    return this.authService.recreatePassword(dto);
  }

  @Get('check-token/:token')
  checkRecreateToken(@Param('token') token: string) {
    return this.recreatePassService.isExist(token);
  }
}
