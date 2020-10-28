import {CreateProductDto, ProductDto, UpdateProductDto} from '../dto/product.dto';


export interface IProductsService {
    getProductById: (productId: number) => Promise<ProductDto>;
    createProduct: (body: CreateProductDto, categoryId: number) => Promise<ProductDto>;
    updateProduct: (productId: number, body: UpdateProductDto) => Promise<ProductDto>;
    deleteProduct: (productId: number) => Promise<void>;
}
