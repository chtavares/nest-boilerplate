import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from '../../helper/password';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from '../../helper/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PasswordService, JwtStrategy, MailerService],
})
export class UserModule {}
