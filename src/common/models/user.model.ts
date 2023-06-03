import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { CreateUserAttrs } from '../interfaces/user.interface'

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @Column({
        type: DataType.STRING,
        /* allowNull: false, */ defaultValue: 'User',
    })
    name: string

    @Column({ type: DataType.INTEGER, unique: true /* allowNull: false */ })
    phone: string
}
