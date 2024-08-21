import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) {}

  async assignRoleToUser(user: User, roleName: string) {
    const role = await this.rolesRepository.findOne({
      where: { name: roleName },
    });
    if (role) {
      user.roles.push(role);
      return user;
    }
    return null;
  }

  // Outros métodos para gerenciar roles e permissions
}
