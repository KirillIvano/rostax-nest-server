import {Controller, Inject, Post, UploadedFile, UseInterceptors, UseGuards} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';

import {getFileExtension} from '~/util/getFileExtension';
import {AuthGuard} from '~/guards/auth.guard';

import {IFileService} from './interfaces/IFileService';


@Controller('/files')
export class FilesController {
    constructor(
        @Inject('FileService') private fileService: IFileService,
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<{fileName: string}> {
        const extension = getFileExtension(file.originalname);
        const fileName = await this.fileService.addFile(extension, file.buffer);

        return {fileName};
    }
}
