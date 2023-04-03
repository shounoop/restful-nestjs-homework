import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams } from './types';
import { CreditCard } from 'src/typeorm/entities/CreditCard';
import { CreateCreditCardParams } from '../credit_cards/types';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

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
    return this.userRepostory.findOne({ where: condition });
  }

  // credit cards
  // findCreditCards() {
  //   return this.creditCardRepository.find();
  // }

  // findCreditCardById(id: number) {
  //   return this.creditCardRepository.findOneBy({ id });
  // }

  // createCreditCard(creditCardDetails: CreateCreditCardParams) {
  //   const newCreditCard = this.creditCardRepository.create({
  //     ...creditCardDetails,
  //     expirationDate: new Date(),
  //     cvc: uuidv4(),
  //   });

  //   return this.creditCardRepository.save(newCreditCard);
  // }
}
