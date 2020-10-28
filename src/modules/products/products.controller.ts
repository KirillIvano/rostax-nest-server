import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import {CreateProductDto, ProductDto, UpdateProductDto} from './dto/product.dto';
import {CategoryDto, CategoryPreviewDto, CreateCategoryDto, UpdateCategoryDto} from './dto/category.dto';
import {ICategoriesService} from './interfaces/ICategoriesService';
import {IProductsService} from './interfaces/IProductsService';


@Controller('/products')
export class ProductsController {
    constructor(
        @Inject('ProductsService') private productsService: IProductsService,
        @Inject('CategoriesService') private categoriesService: ICategoriesService,
    ) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(
        @Body() body: CreateProductDto,
        @Query('categoryId', ParseIntPipe) categoryId: number,
    ): Promise<ProductDto> {
        return this.productsService.createProduct(body, categoryId);
    }

    @Put('/:productId')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async updateProduct(
        @Param('productId', ParseIntPipe) productId: number,
        @Body() body: UpdateProductDto,
    ): Promise<ProductDto> {
        return this.productsService.updateProduct(productId, body);
    }

    @Delete('/:productId')
    async deleteProduct(
        @Param('productId', ParseIntPipe) productId: number,
    ): Promise<Record<string, string>> {
        await this.productsService.deleteProduct(productId);

        return {};
    }

    @Get('/categories')
    getProductCategory(): Promise<CategoryPreviewDto[]> {
        return this.categoriesService.getCategories();
    }

    @Get('/categories/:categoryId')
    getCategoryById(
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ): Promise<CategoryDto> {
        return this.categoriesService.getCategoryById(categoryId);
    }

    @Post('/categories')
    createCategory(
        @Body(new ValidationPipe({whitelist: true})) body: CreateCategoryDto,
    ): Promise<CategoryDto> {
        return this.categoriesService.createCategory(body);
    }

    @Delete('/categories/:categoryId')
    async deleteCategory(
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ): Promise<Record<string, string>> {
        await this.categoriesService.deleteCategory(categoryId);

        return {};
    }

    @Put('/categories/:categoryId')
    async updateCategory(
        @Param('categoryId', ParseIntPipe) categoryId: number,
        @Body(new ValidationPipe({whitelist: true})) body: UpdateCategoryDto,
    ): Promise<CategoryDto> {
        return this.categoriesService.updateCategory(categoryId, body);
    }

    @Get('/:productId')
    getProductById(
        @Param('productId', ParseIntPipe) productId: number,
    ): Promise<ProductDto> {
        return this.productsService.getProductById(productId);
    }
}
