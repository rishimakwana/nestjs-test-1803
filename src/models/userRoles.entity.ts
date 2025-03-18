import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { RoleMst } from './roleMst.entity';
import { User } from './user.entity';


@Table({ tableName: "userRoles", timestamps: true })
export class UserRoles extends Model<UserRoles> {

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => RoleMst)
    @Column({ type: DataType.INTEGER, })
    roleId: number;

    @BelongsTo(() => RoleMst)
    role: RoleMst;
}
