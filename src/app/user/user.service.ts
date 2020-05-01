import {
  BadRequestException,
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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<UserInterface>> {
    return await paginate<UserEntity>(this.userRepository, options);
  }

  async store(body: Partial<UserInterface>): Promise<UserEntity> {
    try {
      return await this.userRepository.save(this.userRepository.create(body));
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
}
