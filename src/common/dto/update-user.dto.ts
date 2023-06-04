import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'Oleksii Bidiak', description: "User's name" })
    readonly name: string

    @ApiProperty({ example: '380123456789', description: "User's phone" })
    readonly phone: string

    @ApiProperty({ example: '', description: "User's avatar path" })
    readonly avatarPath: string
}
