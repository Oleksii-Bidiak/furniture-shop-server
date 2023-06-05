import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from '../common/dto/create-role.dto'
import { UpdateRoleDto } from '../common/dto/update-role.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from 'src/common/models/role.model'

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto)
        return role
    }

    async getAllRoles() {
        const roles = await this.roleRepository.findAll()
        return roles
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } })
        return role
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`
    }

    remove(id: number) {
        return `This action removes a #${id} role`
    }
}
