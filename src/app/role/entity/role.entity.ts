import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'roles', orderBy: { createdAt: 'DESC' } })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
