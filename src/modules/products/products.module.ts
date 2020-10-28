import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ProductsController} from './products.controller';
import {ProductsService} from './services/products.service';
import {CategoriesService} from './services/categories.service';
import {ProductModel} from './entities/product.entity';
import {CategoryModel} from './entities/category.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ProductModel, CategoryModel])],
    controllers: [ProductsController],
    providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}
