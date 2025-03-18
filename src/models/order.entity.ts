import { Model, DataType, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.entity';
import { User } from './user.entity';
import { Store } from './store.entity';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Store)
    @Column({ type: DataType.INTEGER, allowNull: false })
    storeId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity: number;

    @Column({ type: DataType.ENUM('completed', 'return'), allowNull: false, defaultValue: 'completed' })
    status: 'completed' | 'return';

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Store)
    store: Store;
}
