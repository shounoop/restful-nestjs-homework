import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepostory: Repository<User>,
  ) {}

  findUsers() {
    return this.userRepostory.find();
  }

  createUser(userDetails: CreateUserParams) {
    return this.userRepostory.create({
      ...userDetails,
      createdAt: new Date(),
    });
  }

  register(data: any): Promise<User> {
    return this.userRepostory.save({ ...data, createdAt: new Date() });
  }

  findOne(condition: any): Promise<User> {
    return this.userRepostory.findOne({where: condition});
  }
}
