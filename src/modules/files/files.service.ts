import {Injectable} from '@nestjs/common';
import fs from 'fs';
import path from 'path';

import {getUniqueName} from '~/util/getUniqueName';
import {FILES_FOLDER} from '~/settings';

import {IFileService} from './interfaces/IFileService';


@Injectable()
export class FileService implements IFileService {
    private fileNamesCache: string[];

    constructor() {
        this.initialize();
    }

    public addFile(extension: string, file: Buffer): string {
        const fileName = this.generateFileName(extension);
        const writeStream = fs.createWriteStream(path.join(FILES_FOLDER, fileName));

        writeStream.write(file);
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

    private initialize(): void {
        try {
            const filesNames = fs.readdirSync(FILES_FOLDER);
            this.fileNamesCache = filesNames;
        } catch {
            this.fileNamesCache = [];
        }
    }
}
