import { Model, DataType, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ tableName: 'store', timestamps: true })
export class Store extends Model<Store> {

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
