import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ProductsModule} from './modules/products/products.module';
import {FilesModule} from './modules/files/files.module';
import { GlobalModule } from './global.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
    imports: [
        ProductsModule,
        FilesModule,
        AuthModule,
        TypeOrmModule.forRoot({
            logging: true,
            autoLoadEntities: true,
        }),
        GlobalModule,
    ],
    providers: [],
    exports: [TypeOrmModule],
})
export class AppModule {}
