import {Expose, Exclude} from 'class-transformer';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CategoryPreviewDto {
    @Expose() id: number;
    @Expose() name: string;
    @Expose() image: string;
}

export class CategoryDto {
    @Expose() id: number;
    @Expose() name: string;
    @Expose() image: string;
}

export class CreateCategoryDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateCategoryDto {
    @Expose()
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @Exclude()
    image?: string;
}
