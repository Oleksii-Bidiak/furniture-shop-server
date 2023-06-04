import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { User } from './common/models/user.model'
import { RolesModule } from './roles/roles.module'
import { Role } from './common/models/role.model'
import { UserRoles } from './common/models/user-roles.model'

@Module({
    imports: [
        UsersModule,
        AuthModule,
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles],
            autoLoadModels: true,
        }),
        RolesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
