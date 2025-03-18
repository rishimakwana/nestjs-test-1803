import { Model, DataType, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({ tableName: 'productInventory', timestamps: true })
export class ProductInventory extends Model<ProductInventory> {

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    stock: number;

    @BelongsTo(() => Product)
    product: Product;
}
