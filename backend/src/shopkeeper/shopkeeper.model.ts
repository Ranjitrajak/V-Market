import { Column, Model, Table, HasMany, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { Trade } from 'src/trade/trade.model';
import { Product } from '../product/product.model';

@Table
export class Shopkeeper extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number
    @Column
    name: string;

    @Column({ unique: true })
    email: string;

    @Column
    password: string;

    @Column
    address: string;
    @Column
	img: string

    @HasMany(() => Product)
    products: Product[];

    @HasMany(() =>Trade)
    trades: Trade[];
}