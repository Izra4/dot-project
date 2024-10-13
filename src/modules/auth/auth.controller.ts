import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto){
    const user = await this.authService.validateUser(
      loginAuthDto.email,
      loginAuthDto.password,
    );
    if (!user) {
      return {
        statusCode: 400,
        message: 'Email or password is incorrect',
      };
    }
    return this.authService.login(user);
  }
}
