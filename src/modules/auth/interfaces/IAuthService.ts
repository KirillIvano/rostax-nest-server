export interface IAuthService {
    checkAdminPassword: (password: string) => Promise<boolean>;
}
