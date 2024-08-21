import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../rbac/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }

  create(userDto: any): Promise<User> {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user)[0];
  }

  update(id: number, updateUserDto: any): Promise<User> {
    return this.usersRepository.save({ ...updateUserDto, id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async assignRole(userId: number, roleName: string): Promise<User> {
    const user = await this.findOneById(userId);
    if (user) {
      const role = await this.rolesRepository.findOne({
        where: { name: roleName },
      });
      if (role) {
        user.roles = [...user.roles, role];
        return this.usersRepository.save(user);
      }
    }
    return null;
  }
}
