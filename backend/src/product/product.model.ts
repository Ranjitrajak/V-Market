import { Column, Model, Table, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement,HasMany } from 'sequelize-typescript';
import { Trade } from 'src/trade/trade.model';
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

    @BelongsTo(() => Shopkeeper)
    shopkeeper: Shopkeeper;

    @Column
    img:string

    @HasMany(() => Trade)
    trades: Trade[];

    
}