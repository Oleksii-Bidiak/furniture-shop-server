import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/common/dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    create(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    //  @Get(':id')
    //  findOne(@Param('id') id: string) {
    //      return this.authService.findOne(+id)
    //  }

    //  @Patch(':id')
    //  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    //      return this.authService.update(+id, updateAuthDto)
    //  }

    //  @Delete(':id')
    //  remove(@Param('id') id: string) {
    //      return this.authService.remove(+id)
    //  }
}
