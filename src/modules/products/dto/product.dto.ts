import {Expose} from 'class-transformer';
import {IsOptional, IsString, IsNumber} from 'class-validator';


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
    image: string;

    @IsString()
    shortDescription: string;

    @IsString()
    @IsOptional()
    certificate?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price?: number;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    shortDescription?: string;

    @IsString()
    @IsOptional()
    certificate?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price?: number;
}
