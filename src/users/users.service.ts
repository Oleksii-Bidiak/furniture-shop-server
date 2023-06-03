import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../common/dto/create-user.dto'
import { UpdateUserDto } from '../common/dto/update-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/common/models/user.model'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    create(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(dto)
        return user
    }

    findAll(): Promise<User[]> {
        const users = this.userRepository.findAll()
        return users
    }

    getUser(value: number | string) {
        if (typeof value === 'number') {
            const user = this.userRepository.findOne({ where: { id: value } })
            return user
        }
        if (typeof value === 'string') {
            const user = this.userRepository.findOne({
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
