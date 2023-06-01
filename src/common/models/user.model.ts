import { Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'users' })
export class Users extends Model {}
