import {Expose} from 'class-transformer';
import {IsOptional, IsString} from 'class-validator';

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
    @Expose() @IsString() name: string;
    @Expose() @IsString() image: string;
}

export class UpdateCategoryDto {
    @Expose()
    @IsOptional()
    name?: string;

    @Expose()
    @IsOptional()
    image?: string;
}
