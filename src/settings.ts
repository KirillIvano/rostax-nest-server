import path from 'path';


export const FILES_FOLDER = path.resolve(__dirname, '..', 'resources', 'files');
export const ADMIN_LOGIN = process.env.ADMIN_LOGIN as string;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;
