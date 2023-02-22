import { Column, Model, Table, PrimaryKey, AutoIncrement,ForeignKey,BelongsTo } from 'sequelize-typescript';
import { Product } from 'src/product/product.model';
import { Shopkeeper } from 'src/shopkeeper/shopkeeper.model';


@Table
export class Trade extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    tradeId: number;

    @ForeignKey(() => Shopkeeper)
    @Column
    exportedBy: number;
    @BelongsTo(() => Shopkeeper, 'exportedBy')
    exporter: Shopkeeper;

    @ForeignKey(() => Shopkeeper)
    @Column
    importedBy:number;
    @BelongsTo(() => Shopkeeper, 'importedBy')
    importer: Shopkeeper;

    @Column
    quantity: number;

    @ForeignKey(() =>Product)
    @Column
    productId: number;
    @BelongsTo(() => Product)
    product: Product;
    

}