import { Model, DataType, Column, Table, HasOne } from 'sequelize-typescript';
import { UserRoles } from './userRoles.entity';

@Table({ tableName: 'user', timestamps: true })
export class User extends Model<User> {

    @Column({ type: DataType.STRING, allowNull: false, })
    name: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING })
    password: string;

    @HasOne(() => UserRoles)
    userRoles: UserRoles;
}
