import {Injectable} from '@nestjs/common';
import {promises as fs} from 'fs';
import path from 'path';

import {getUniqueName} from '~/util/getUniqueName';
import {FILES_FOLDER} from '~/settings';


@Injectable()
export class FileService {
    private fileNamesCache: string[];

    public async saveFile(fileName: string, file: Buffer): Promise<void> {
        const filePath = path.resolve(FILES_FOLDER, fileName);

        fs.writeFile(filePath, file);
    }

    public async addFile(extension: string, file: Buffer): Promise<string> {
        const fileName = this.generateFileName(extension);

        this.saveFile(fileName, file);
        this.fileNamesCache.push(fileName);

        return fileName;
    }

    private generateFileName(extension: string): string {
        let fileName = getUniqueName();

        while (this.fileNamesCache.includes(fileName)) {
            fileName = getUniqueName();
        }

        return `${fileName}.${extension}`;
    }

    async initialize(): Promise<void> {
        try {
            const filesNames = await fs.readdir(FILES_FOLDER);

            this.fileNamesCache = filesNames;
        } catch {
            this.fileNamesCache = [];
        }
    }
}
