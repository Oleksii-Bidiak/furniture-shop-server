import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../common/dto/create-user.dto'
import { UpdateUserDto } from '../common/dto/update-user.dto'

@Injectable()
export class UsersService {
    create(createUserDto: CreateUserDto) {
        return ['This action adds a new user', createUserDto]
    }

    findAll() {
        return `This action returns all users`
    }

    findOne(id: number) {
        return `This action returns a #${id} user`
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return [`This action updates a #${id} user`, updateUserDto]
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
