import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        UsersModule,
        AuthModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'test',
            models: [],
            autoLoadModels: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
