import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IndexUserQueryDto } from './dto/index-user.dto';
import { StoreUserDto } from './dto/store-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async paginate(@Query() query?: IndexUserQueryDto) {
    return this.userService.paginate(query);
  }

  @Post()
  async store(@Req() req: Request, @Body() body: StoreUserDto) {
    return await this.userService.store(body);
  }

  @Get(':id')
  async show(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.userService.show(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.destroy(id);
  }
}
