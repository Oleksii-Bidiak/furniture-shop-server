import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../common/dto/create-user.dto'
import { UpdateUserDto } from '../common/dto/update-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/common/models/user.model'
import { RolesService } from 'src/roles/roles.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(dto)
        const role = await this.rolesService.getRoleByValue('User')
        await user.$set('roles', [role.id])
        return user
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.findAll({
            include: { all: true },
        })
        return users
    }

    async getUser(value: number | string) {
        if (typeof value === 'number') {
            const user = await this.userRepository.findOne({
                where: { id: value },
            })
            return user
        }
        if (typeof value === 'string') {
            const user = await this.userRepository.findOne({
                where: { email: value },
            })
            return user
        }
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return [`This action updates a #${id} user`, updateUserDto]
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
