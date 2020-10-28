import crypto from 'crypto';


export const getUniqueName = (): string =>
    crypto.randomBytes(16).toString('hex');
