import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('/signUp')
    signUp(@Body('id') id: string, @Body('pw') pw: string): Promise<void> {
        return this.service.signUp(id, pw);
    }
}
