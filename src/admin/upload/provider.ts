import {BaseProvider} from '@admin-bro/upload';
import {UploadedFile} from 'admin-bro';
import fs from 'fs';
import path from 'path';

import {FILES_FOLDER} from '~/settings';


export class UploadProvider extends BaseProvider {
    constructor(bucket: string) {
        super(bucket);

        this.bucket = bucket;
    }

    async upload(file: UploadedFile, key: string): Promise<void> {
        const filePath = this.path(key);
        console.log(key, file);
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.rename(file.path, filePath);
    }

    async delete(key: string, bucket: string): Promise<void> {
        console.log(key, bucket);
        await fs.promises.unlink(this.path(key, bucket));
    }

    path(key: string, bucket?: string): string {
        return path.resolve(bucket || this.bucket, key);
    }
}

export const uploadProvider = new UploadProvider(FILES_FOLDER);
