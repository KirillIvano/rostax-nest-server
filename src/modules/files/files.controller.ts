import {Controller, Inject, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';

import {getFileExtension} from '~/util/getFileExtension';

import {IFileService} from './interfaces/IFileService';


@Controller('/files')
export class FilesController {
    constructor(
        @Inject('FileService') private fileService: IFileService,
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File): {fileName: string} {
        const extension = getFileExtension(file.originalname);
        const fileName = this.fileService.addFile(extension, file.buffer);

        return {fileName};
    }
}
