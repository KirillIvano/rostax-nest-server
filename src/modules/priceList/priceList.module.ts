import {Module} from '@nestjs/common';

import {PriceListController} from './priceList.controller';
import {PriceListProvider} from './providers/priceList.provider';


@Module({
    controllers: [PriceListController],
    providers: [PriceListProvider],
})
export class PriceListModule {}
