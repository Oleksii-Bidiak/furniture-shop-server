import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
    @ApiProperty({ example: 'User', description: "User's role" })
    readonly value: string

    @ApiProperty({ example: 'Користувач', description: 'Опис ролі' })
    readonly description: string
}
