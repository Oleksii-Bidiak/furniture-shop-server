import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from '../common/dto/create-role.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Role } from 'src/common/models/role.model'

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
    getByValye(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }
}
