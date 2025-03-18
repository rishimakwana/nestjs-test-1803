import { Model, DataType, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Table({ tableName: 'orderHistory', timestamps: true })
export class OrderHistory extends Model<OrderHistory> {

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    orderId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    stock: number;

    @Column({ type: DataType.ENUM('buy', 'return'), allowNull: false })
    action: 'buy' | 'return';

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => Order)
    order: Order;
}
