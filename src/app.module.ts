import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ProductsModule} from './modules/products/products.module';
import {FilesModule} from './modules/files/files.module';


@Module({
    imports: [
        ProductsModule,
        FilesModule,
        TypeOrmModule.forRoot({
            logging: true,
            autoLoadEntities: true,
        }),
    ],
    providers: [],
    exports: [TypeOrmModule],
})
export class AppModule {}
