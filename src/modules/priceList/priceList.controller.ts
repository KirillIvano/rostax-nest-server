import {Controller, Inject, Post, UseGuards, UseInterceptors, UploadedFile} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import path from 'path';

import {AuthGuard} from '~/guards/auth.guard';
import {IPriceListProvider} from './interfaces/IPriceListProvider';


@Controller('/priceList')
export class PriceListController  {
    constructor(
        @Inject('PriceListProvider') private priceListProvider: IPriceListProvider,
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('pricing'))
    async updatePriceList(
        @UploadedFile() priceList: Express.Multer.File,
    ): Promise<Record<string, unknown>> {
        const extension = path.extname(priceList.originalname);

        await this.priceListProvider.updatePriceList(priceList.buffer, extension);

        return {};
    }
}
