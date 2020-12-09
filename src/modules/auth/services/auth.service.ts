import {Injectable} from '@nestjs/common';

import {ADMIN_PASSWORD} from '~/settings';

import {IAuthService} from '../interfaces/IAuthService';


@Injectable()
export class AuthService implements IAuthService {
    checkAdminPassword = async (password: string): Promise<boolean> => {
        return password === ADMIN_PASSWORD;
    }
}
