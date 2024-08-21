import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { RbacModule } from './rbac/rbac.module';
import { UsersModule } from './users/users.module';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PL_HOST,
      port: parseInt(process.env.PL_PORT) || 5432,
      username: process.env.PL_USER,
      password: process.env.PL_PASSWORD,
      database: process.env.PL_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    RbacModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
