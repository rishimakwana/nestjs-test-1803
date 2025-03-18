import { Model, DataType, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';
import { Store } from './store.entity';

@Table({ tableName: 'product', timestamps: true })
export class Product extends Model<Product> {

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    imageUrl: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    price: number;

    @Column({ type: DataType.ENUM('active', 'inActive'), allowNull: false, defaultValue: 'active' })
    status: 'active' | 'inActive';

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    stock: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Store)
    @Column({ type: DataType.INTEGER, allowNull: false })
    storeId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Store)
    store: Store;
}
