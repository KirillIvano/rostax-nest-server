import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    RelationId,
    BaseEntity,
} from 'typeorm';

import {CategoryModel} from './category.entity';


@Entity({name: 'products'})
export class ProductModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    shortDescription: string;

    @Column()
    image: string;

    @Column({default: ''})
    description?: string

    @Column({default: null, nullable: true})
    price?: number;

    @Column({default: ''})
    certificate?: string;

    @ManyToOne(
        () => CategoryModel,
        category => category.products,
        {cascade: ['remove']},
    )
    @JoinColumn({name: 'categoryId'})
    category: Promise<CategoryModel>;

    @Column()
    @RelationId((product: ProductModel) => product.category)
    categoryId: number;
}
