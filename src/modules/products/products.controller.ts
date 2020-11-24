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
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
} from '@nestjs/common';
import {FileFieldsInterceptor, FileInterceptor} from '@nestjs/platform-express';

import {getFileExtension} from '~/util/getFileExtension';

import {CreateProductDto, ProductDto, ProductPreviewDto, UpdateProductDto} from './dto/product.dto';
import {CategoryDto, CategoryPreviewDto, CreateCategoryDto, UpdateCategoryDto} from './dto/category.dto';
import {ICategoriesService} from './interfaces/ICategoriesService';
import {IProductsService} from './interfaces/IProductsService';
import {IFileService} from '../files/interfaces/IFileService';


@Controller('/products')
export class ProductsController {
    constructor(
        @Inject('ProductsService') private productsService: IProductsService,
        @Inject('CategoriesService') private categoriesService: ICategoriesService,
        @Inject('FileService') private filesService: IFileService,
    ) {}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true}))
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1},
        {name: 'certificate', maxCount: 1},
    ]))
    createProduct(
        @Body() body: CreateProductDto,
        @Query('categoryId', ParseIntPipe) categoryId: number,
        @UploadedFiles() files: {image: Express.Multer.File[], certificate: Express.Multer.File[]},
    ): Promise<ProductDto> {
        const {image: [imageFile], certificate: [certFile]} = files;

        const imageExtension = getFileExtension(imageFile.originalname);
        const imageName = this.filesService.addFile(imageExtension, imageFile.buffer);

        const certExtension = getFileExtension(certFile.originalname);
        const certName = this.filesService.addFile(certExtension, certFile.buffer);

        return this.productsService.createProduct(
            {
                ...body,
                image: imageName,
                certificate: certName,
            },
            categoryId,
        );
    }

    @Get()
    async getProductsPreviews(): Promise<{products: ProductPreviewDto[]}> {
        const products = await this.productsService.getProductsPreviews();

        return {products};
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
    async getProductsCategories(): Promise<{categories: CategoryPreviewDto[]}> {
        return {categories: await this.categoriesService.getCategories()};
    }

    @Get('/categories/:categoryId')
    getCategoryById(
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ): Promise<CategoryDto> {
        return this.categoriesService.getCategoryById(categoryId);
    }

    @Post('/categories')
    @UseInterceptors(FileInterceptor('image'))
    async createCategory(
        @Body(new ValidationPipe({whitelist: true})) body: CreateCategoryDto,
        @UploadedFile() imageFile: Express.Multer.File,
    ): Promise<CategoryDto> {
        const imageExtension = getFileExtension(imageFile.originalname);
        const imageName = this.filesService.addFile(imageExtension, imageFile.buffer);

        return this.categoriesService.createCategory({
            ...body,
            image: imageName,
        });
    }

    @Delete('/categories/:categoryId')
    async deleteCategory(
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ): Promise<Record<string, string>> {
        await this.categoriesService.deleteCategory(categoryId);

        return {};
    }

    @Put('/categories/:categoryId')
    @UseInterceptors(FileInterceptor('image'))
    async updateCategory(
        @Param('categoryId', ParseIntPipe) categoryId: number,
        @Body(new ValidationPipe({whitelist: true})) body: UpdateCategoryDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<CategoryDto> {
        if (file) {
            const imageExtension = getFileExtension(file.originalname);
            const fileName = this.filesService.addFile(imageExtension, file.buffer);

            body.image = fileName;
        }

        return this.categoriesService.updateCategory(categoryId, body);
    }

    @Get('/:productId')
    async getProductById(
        @Param('productId', ParseIntPipe) productId: number,
    ): Promise<{product: ProductDto}> {
        const product = await this.productsService.getProductById(productId);

        return {product};
    }
}
