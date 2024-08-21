import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), UsersModule],
  providers: [RbacService],
  controllers: [RbacController],
})
export class RbacModule {}
