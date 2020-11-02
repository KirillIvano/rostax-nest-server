import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
} from 'typeorm';


@Entity()
export class FileBaseModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isDigested: boolean;

    @Column()
    name: string;
}
