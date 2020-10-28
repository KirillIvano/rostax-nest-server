import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {plainToClass} from 'class-transformer';
import {Repository} from 'typeorm';

import {CreateProductDto, ProductDto, UpdateProductDto} from './../dto/product.dto';
import {ProductModel} from './../entities/product.entity';
import {IProductsService} from './../interfaces/IProductsService';


@Injectable()
export class ProductsService implements IProductsService {
    constructor(@InjectRepository(ProductModel) private productsRepository: Repository<ProductModel>) {}

    getProductById = async (productId: number): Promise<ProductDto> => {
        const product = await this.productsRepository.findOne(productId);

        return plainToClass(ProductDto, product);
    }

    createProduct = async (data: CreateProductDto, categoryId: number): Promise<ProductDto> => {
        const product = this.productsRepository.create(data);
        product.categoryId = categoryId;

        await this.productsRepository.save(product);

        return plainToClass(ProductDto, product);
    }

    updateProduct = async (productId: number, data: UpdateProductDto): Promise<ProductDto> => {
        await this.productsRepository.update(productId, data);

        const product = await this.productsRepository.findOne(productId);

        return plainToClass(ProductDto, product);
    }

    deleteProduct = async (productId: number): Promise<void> => {
        await this.productsRepository.delete(productId);
    }
}
