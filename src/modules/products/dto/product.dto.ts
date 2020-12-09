import {Expose, Exclude} from 'class-transformer';
import {IsOptional, IsString} from 'class-validator';


export class ProductDto {
    @Expose() id: number;
    @Expose() name: string;
    @Expose() price: number;
    @Expose() shortDescription: string;
    @Expose() description: string;
    @Expose() imageUrl: string;
    @Expose() certificateUrl: string;
    @Expose() categoryId: number;
}

export class ProductPreviewDto {
    @Expose() id: number;
    @Expose() name: string;
    @Expose() image: string;
    @Expose() shortDescription: string;
    @Expose() categoryId: number;
}

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    shortDescription: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    price?: number;
}

// TODO: конечно, нужно сделать отдельные интерфейсы для Dto и сервисов
export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    @Exclude()
    image?: string;

    @IsString()
    @IsOptional()
    @Exclude()
    certificate?: string;

    @IsString()
    @IsOptional()
    shortDescription?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    price?: number;
}
