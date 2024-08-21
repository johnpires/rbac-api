import { Controller, Post, Body, Param } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { UsersService } from '../users/users.service';

@Controller('rbac')
export class RbacController {
  constructor(
    private readonly rbacService: RbacService,
    private readonly usersService: UsersService,
  ) {}

  @Post('assign-role/:username')
  async assignRole(
    @Param('username') username: string,
    @Body('role') role: string,
  ) {
    const user = await this.usersService.findOne(username);
    if (user) {
      return this.rbacService.assignRoleToUser(user, role);
    }
    return null;
  }

  // Outras rotas para gerenciar papéis e permissões
}
