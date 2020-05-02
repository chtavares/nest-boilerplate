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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IndexUserQueryDto } from './dto/index-user.dto';
import { StoreUserDto } from './dto/store-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Req() req: Request, @Body() body: LoginUserDto) {
    return this.userService.login(body);
  }

  @Post('forget')
  async forget(@Req() req: Request, @Body() body: LoginUserDto) {
    return await this.userService.forget(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async paginate(@Query() query?: IndexUserQueryDto) {
    return this.userService.paginate(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async store(@Req() req: Request, @Body() body: StoreUserDto) {
    return await this.userService.store(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    console.log(req.headers);
    return this.userService.show(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.destroy(id);
  }
}
