import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from '../common/dto/create-role.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Role } from 'src/common/models/role.model'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: "Create user's role" })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @ApiOperation({ summary: "Get user's role by value" })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }

    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, type: [Role] })
    @Get()
    getAllRoles() {
        return this.rolesService.getAllRoles()
    }
}
