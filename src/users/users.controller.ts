import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from '../common/dto/create-user.dto'
import { UpdateUserDto } from '../common/dto/update-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from 'src/common/models/user.model'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard'
import { Roles } from 'src/common/decorators/roles-auth.decorator'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { CreateRoleDto } from 'src/common/dto/create-role.dto'
import { AddRoleDto } from 'src/common/dto/add-role'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @ApiOperation({ summary: 'Add role for user' })
    @ApiResponse({ status: 200 })
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }
}
