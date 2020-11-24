import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from 'typeorm';

import {ProductModel} from './product.entity';


@Entity({name: 'categories'})
export class CategoryModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @OneToMany(
        () => ProductModel,
        product => product.category,
        {cascade: ['remove']},
    )
    products: Promise<ProductModel[]>
}
