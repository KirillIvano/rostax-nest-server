import {CreateProductDto, ProductDto, ProductPreviewDto, UpdateProductDto} from '../dto/product.dto';


export interface IProductsService {
    getProductById: (productId: number) => Promise<ProductDto>;
    getProductsPreviews: () => Promise<ProductPreviewDto[]>;
    createProduct: (
        body: CreateProductDto & {image: string; certificate: string},
        categoryId: number
    ) => Promise<ProductDto>;
    updateProduct: (productId: number, body: UpdateProductDto) => Promise<ProductDto>;
    deleteProduct: (productId: number) => Promise<void>;
}
