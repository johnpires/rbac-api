// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint para obter todos os usuários (apenas para fins administrativos)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Endpoint para obter um usuário específico
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  // Endpoint para criar um novo usuário (caso precise de um registro manual)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  // Endpoint para atualizar um usuário
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Endpoint para deletar um usuário
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Endpoint para atribuir um papel ao usuário (relacionado ao RBAC)
  @UseGuards(JwtAuthGuard)
  @Post(':id/roles')
  assignRole(@Param('id') id: string, @Body('role') role: string) {
    return this.usersService.assignRole(+id, role);
  }
}
