import {CategoryDto, CategoryPreviewDto, UpdateCategoryDto} from '../dto/category.dto';
import {ProductPreviewDto} from '../dto/product.dto';


export interface ICategoriesService {
    getCategories: () => Promise<CategoryPreviewDto[]>;
    getCategoryById: (categoryId: number) => Promise<CategoryDto>;
    getProductsByCategory: (categoryid: number) => Promise<ProductPreviewDto[]>;
    createCategory: (data: {name: string, image: string}) => Promise<CategoryDto>;
    updateCategory: (categoryId: number, data: UpdateCategoryDto) => Promise<CategoryDto>;
    deleteCategory: (categoryId: number) => Promise<void>;
}
