import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { RoleCreationAttrs } from '../interfaces/role.interface'
import { User } from './user.model'
import { UserRoles } from './user-roles.model'

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique key' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'User', description: "User's role" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string

    @ApiProperty({ example: 'Користувач', description: 'Опис ролі' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}
