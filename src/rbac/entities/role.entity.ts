import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
