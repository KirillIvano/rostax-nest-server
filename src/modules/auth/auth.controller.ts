import {Controller, Get, Inject, Query} from '@nestjs/common';
import {IAuthService} from './interfaces/IAuthService';


@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AuthService') private authService: IAuthService,
    ) {}

    @Get('/adminLogin')
    async checkAdminAuth(@Query('password') password: string): Promise<{valid: boolean}> {
        const isPasswordValid = await this.authService.checkAdminPassword(password);

        return {valid: isPasswordValid};
    }
}
