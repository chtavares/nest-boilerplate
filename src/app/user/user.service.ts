import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessages } from '../../constant/error.types';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UserEntity } from './entity/user.entity';
import { UserInterface } from './interface/user.interface';
import { Repository } from 'typeorm';
import { PasswordService } from '../../helper/password';
import { LoginInterface } from './interface/login.interface';
import { ForgetInterface } from './interface/forget.interface';
import * as crypto from 'crypto';
import { MailerService } from '../../helper/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly mailerService: MailerService,
  ) {}

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<UserInterface>> {
    return await paginate<UserEntity>(
      this.userRepository,
      {
        ...options,
        page: options.page || 1,
        limit: options.limit || 10,
      },
      { relations: ['role'] },
    );
  }

  async login(body: Partial<LoginInterface>) {
    try {
      const user = await this.userRepository.findOneOrFail({
        email: body.email,
      });

      const isValid = this.passwordService.validatePassword(
        body.password,
        user.password,
      );

      if (!isValid) {
        throw UnauthorizedException;
      }

      return {
        ...user,
        token: await this.passwordService.generateJWTToken(
          user.id,
          user.roleId,
        ),
      };
    } catch (e) {
      throw new NotFoundException(ErrorMessages.ENTITY_NOT_FOUND);
    }
  }

  async forget(body: Partial<ForgetInterface>): Promise<any> {
    try {
      const token = crypto.randomBytes(10).toString('hex');
      const user = await this.userRepository.findOneOrFail({
        email: body.email,
      });

      this.userRepository.merge(user, { passwordResetToken: token });

      const template = this.mailerService.templateForgetPassword(token);

      await this.mailerService.sendEmail(body.email, template);

      return { email: body.email };
    } catch (e) {}
  }

  async store(body: Partial<UserInterface>): Promise<UserEntity> {
    try {
      const { password, ...allBody } = body;
      const criptPassword = await this.passwordService.encryptPassword(
        password,
        10,
      );

      return await this.userRepository.save(
        this.userRepository.create({ ...allBody, password: criptPassword }),
      );
    } catch (e) {
      throw new InternalServerErrorException(
        ErrorMessages.ERROR_ON_SAVE_ENTITY_DATA,
      );
    }
  }

  async show(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail(id, {
        relations: ['role'],
      });
    } catch (e) {
      throw new NotFoundException(ErrorMessages.ENTITY_NOT_FOUND);
    }
  }

  async update(id: string, body: Partial<UserInterface>): Promise<UserEntity> {
    const user = await this.show(id);
    try {
      const { password, ...allBody } = body;

      if (password) {
        const criptPassword = await this.passwordService.encryptPassword(
          password,
          10,
        );

        this.userRepository.merge(user, {
          ...allBody,
          password: criptPassword,
        });
      } else {
        this.userRepository.merge(user, body);
      }

      return await this.userRepository.save(user);
    } catch (e) {
      throw new InternalServerErrorException(
        ErrorMessages.ERROR_ON_UPDATE_ENTITY_DATA,
      );
    }
  }

  async destroy(id: string): Promise<boolean> {
    try {
      const isDeleted = await this.userRepository.softDelete(id);
      return isDeleted.raw.affectedRows > 0;
    } catch (e) {
      throw new InternalServerErrorException(
        ErrorMessages.ERROR_ON_SAVE_ENTITY_DATA,
      );
    }
  }
}
