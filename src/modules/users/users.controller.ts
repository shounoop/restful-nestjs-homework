import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getUsers() {
    const users = this.usersService.findUsers();
    return users;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password.toString(), 12);

    const user = await this.usersService.register({
      username,
      password: hashedPassword,
    });

    const { password: passwordHere, ...result } = user;

    return result;
  }

  @Post('login')
  async login(
    @Body() loginDto: { username: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.usersService.findOne({
      username: loginDto.username,
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day (expiresIn)
    });

    return { message: 'success' };
  }

  @Get('user')
  async getCurrentUser(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.usersService.findOne({
        id: data['id'],
      });

      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return { message: 'success' };
  }
}
