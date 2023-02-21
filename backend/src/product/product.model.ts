import { Column, Model, Table, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Shopkeeper } from '../shopkeeper/shopkeeper.model';

@Table
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number
    @Column
    name: string;

    @Column
    quantity: number;
    @Column
    price:number

    @Column
    description: string;

    @ForeignKey(() => Shopkeeper)
    @Column
    shopkeeperId: number;
    @Column
    img:string

    @BelongsTo(() => Shopkeeper)
    shopkeeper: Shopkeeper;
}