import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<UserInterface>> {
    return await paginate<UserEntity>(this.userRepository, options);
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
      return await this.userRepository.findOneOrFail(id);
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
