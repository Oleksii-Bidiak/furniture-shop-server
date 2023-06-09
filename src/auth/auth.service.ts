import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from 'src/common/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcryptjs from 'bcryptjs'
import { User } from 'src/common/models/user.model'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException(
                `Користувач із таким email ${userDto.email} вже існує`,
                HttpStatus.BAD_REQUEST,
            )
        }

        const hashPassword = await bcryptjs.hash(userDto.password, 8)
        const user = await this.userService.create({
            ...userDto,
            password: hashPassword,
        })

        return this.generateToken(user)
    }

    private generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload),
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcryptjs.compare(
            userDto.password,
            user.password,
        )
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({
            message: 'Некоректний email або пароль',
        })
    }

    //  findOne(id: number) {
    //      return `This action returns a #${id} auth`
    //  }

    //  update(id: number, updateAuthDto: UpdateAuthDto) {
    //      return `This action updates a #${id} auth`
    //  }

    //  remove(id: number) {
    //      return `This action removes a #${id} auth`
    //  }
}
