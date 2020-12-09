import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';

import {ADMIN_PASSWORD} from '~/settings';


const parsePassword = (header: string) =>
    header.split(' ')[1];

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean {
        const req = ctx.switchToHttp().getRequest() as Request;

        const authHeader = req.headers['authorization'];

        if (authHeader && (parsePassword(authHeader) === ADMIN_PASSWORD)) {
            return true;
        }

        return false;
    }
}
