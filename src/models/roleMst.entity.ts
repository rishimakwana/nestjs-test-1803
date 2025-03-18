import { Table, Column, Model, HasOne } from 'sequelize-typescript';
import { UserRoles } from './userRoles.entity';

@Table({ tableName: "roleMst", timestamps: true })
export class RoleMst extends Model<RoleMst> {

    @Column({ unique: true, allowNull: false })
    name: string;

    @HasOne(() => UserRoles)
    userRoles: UserRoles;
}
