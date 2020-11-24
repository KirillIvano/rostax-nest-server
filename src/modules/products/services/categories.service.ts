import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {plainToClass} from 'class-transformer';
import {Repository} from 'typeorm';

import {CategoryDto, CategoryPreviewDto, UpdateCategoryDto} from '../dto/category.dto';
import {ProductPreviewDto} from '../dto/product.dto';
import {ICategoriesService} from '../interfaces/ICategoriesService';
import {CategoryModel} from './../entities/category.entity';
import {ProductModel} from './../entities/product.entity';


@Injectable()
export class CategoriesService implements ICategoriesService {
    constructor(
        @InjectRepository(CategoryModel) private categoriesRepository: Repository<CategoryModel>,
        @InjectRepository(ProductModel) private productsRepository: Repository<ProductModel>,
    ) {}

    getCategories = async (): Promise<CategoryPreviewDto[]> =>
        plainToClass(CategoryPreviewDto, await this.categoriesRepository.find());

    getCategoryById = async (categoryId: number): Promise<CategoryDto> =>
        plainToClass(CategoryDto, await this.categoriesRepository.findOne(categoryId));

    getProductsByCategory = async (categoryId: number): Promise<ProductPreviewDto[]> =>
        plainToClass(ProductPreviewDto, await this.productsRepository.find({categoryId}));

    createCategory = async (body: {name: string, image: string}): Promise<CategoryDto> =>
        plainToClass(CategoryDto, await this.categoriesRepository.save(body));

    updateCategory = async (categoryId: number, updates: UpdateCategoryDto): Promise<CategoryDto> => {
        await this.categoriesRepository.update(categoryId, updates);

        const updatedCategory = await this.categoriesRepository.findOne(categoryId);
        return plainToClass(CategoryDto, updatedCategory);
    }

    deleteCategory = async (categoryId: number): Promise<void> => {
        await this.categoriesRepository.delete(categoryId);
    }
}
