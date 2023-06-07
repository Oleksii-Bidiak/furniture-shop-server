import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CreateUserDto } from '../common/dto/create-user.dto'
import { UpdateUserDto } from '../common/dto/update-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/common/models/user.model'
import { RolesService } from 'src/roles/roles.service'
import { AddRoleDto } from 'src/common/dto/add-role'

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
        user.roles = [role]
        return user
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.findAll({
            include: { all: true },
        })
        return users
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        })
        return user
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            include: { all: true },
        })
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.rolesService.getRoleByValue(dto.value)
        if (user && role) {
            await user.$add('role', role.id)
            return dto
        }

        throw new HttpException(
            `Користувача або роль не було знайдено`,
            HttpStatus.NOT_FOUND,
        )
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return [`This action updates a #${id} user`, updateUserDto]
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
