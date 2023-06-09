import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
    @IsEmail({}, { message: 'Некоректний email' })
    readonly email: string

    @ApiProperty({ example: 'user@gmail.com', description: "User's password" })
    @IsString()
    @Length(4, 16, {
        message: 'Пароль повинен мати не менше 4 і не більше 16 символів',
    })
    readonly password: string
}
