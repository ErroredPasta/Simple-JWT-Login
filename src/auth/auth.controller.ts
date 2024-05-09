import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/signUp')
  signUp(@Body('id') id: string, @Body('pw') pw: string): Promise<void> {
    return this.service.signUp(id, pw);
  }

  @Post('/signIn')
  @HttpCode(HttpStatus.OK)
  signIn(@Body('id') id: string, @Body('pw') pw: string): Promise<{ token: string }> {
    return this.service.signIn(id, pw);
  }

  @Post('/secureSignIn')
  @HttpCode(HttpStatus.OK)
  secureSignIn(@Body('id') id: string, @Body('pw') pw: string, @Body('publicKey') publicKey: string): Promise<{ token: string }> {
    return this.service.secureSignIn(id, pw, publicKey);
  }
}
