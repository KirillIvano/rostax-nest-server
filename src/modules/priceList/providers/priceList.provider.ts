import {Injectable, Inject, BadRequestException} from '@nestjs/common';

import {IFileService} from './../interfaces/IFileService';
import {IPriceListProvider} from '../interfaces/IPriceListProvider';


@Injectable()
export class PriceListProvider implements IPriceListProvider {
    private static ALLOWED_EXTENSIONS = ['.xlsx', '.xls', '.doc', '.docx'];
    private static PRICE_LIST_NAME = 'priceList';

    private static getFullPriceListNameFromExtension = (ext: string) =>
        `${PriceListProvider.PRICE_LIST_NAME}${ext}`

    constructor(
        @Inject('FileService') private fileService: IFileService,
    ) {}

    updatePriceList = async (buffer: Buffer, extension: string): Promise<void> => {
        if (!extension || !PriceListProvider.ALLOWED_EXTENSIONS.includes(extension)) {
            throw new BadRequestException(`Расширение файла не может быть ${extension}`);
        }

        const fullName = PriceListProvider.getFullPriceListNameFromExtension(extension);

        await this.fileService.saveFile(fullName, buffer);
    }
}
