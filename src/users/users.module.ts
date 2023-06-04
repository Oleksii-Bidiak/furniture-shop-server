import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/common/models/user.model'
import { Role } from 'src/common/models/role.model'
import { UserRoles } from 'src/common/models/user-roles.model'
import { RolesModule } from 'src/roles/roles.module'

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
})
export class UsersModule {}
