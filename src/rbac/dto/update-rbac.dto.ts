import { PartialType } from '@nestjs/mapped-types';
import { CreateRbacDto } from './create-rbac.dto';

export class UpdateRbacDto extends PartialType(CreateRbacDto) {}
