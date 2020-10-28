import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

import {ProductModel} from './product.entity';


@Entity()
export class CategoryModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @ManyToOne(() => ProductModel, product => product.category)
    products: Promise<ProductModel[]>
}
