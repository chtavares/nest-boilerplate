import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users', orderBy: { createdAt: 'DESC' } })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ name: 'password_reset_token', unique: true, nullable: true })
  passwordResetToken: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
