import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript'
import { UserCreationAttrs } from '../interfaces/user.interface'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from './role.model'
import { UserRoles } from './user-roles.model'

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique key' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: '123456789', description: "User's password" })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({ example: 'Oleksii Bidiak', description: "User's name" })
    @Column({
        type: DataType.STRING,
        /* allowNull: false, */ defaultValue: 'User',
    })
    name: string

    @ApiProperty({ example: '380123456789', description: "User's phone" })
    @Column({ type: DataType.INTEGER, unique: true /* allowNull: false */ })
    phone: string

    @ApiProperty({ example: '', description: "User's avatar path" })
    @Column({ type: DataType.INTEGER })
    avatarPath: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}
