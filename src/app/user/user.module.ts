import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from '../../helper/password';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
