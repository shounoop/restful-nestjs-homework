import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from 'src/typeorm/entities/CreditCard';
import { Repository } from 'typeorm';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { CreateCreditCardParams } from './types';
import { User } from 'src/typeorm/entities/User';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    @InjectRepository(User) private readonly userRepostory: Repository<User>,
  ) {}

  findCreditCards() {
    return this.creditCardRepository.find();
  }

  findCreditCardById(id: number) {
    return this.creditCardRepository.findOneBy({ id });
  }

  async createCreditCard(creditCardDetails: CreateCreditCardParams) {
    // const user = await this.userRepostory.findOne({
    //   where: { username: creditCardDetails.username },
    // });

    // if (!user) {
    //   throw new HttpException(
    //     'User not found. Cannot create Post',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const newCreditCard = this.creditCardRepository.create({
      ...creditCardDetails,
      expirationDate: new Date(),
      cvc: uuidv4(),
    });

    return this.creditCardRepository.save(newCreditCard);

    // user.creditCard = newCreditCard;
    // return this.userRepostory.save(user);
  }

  handerPayment(id: number) {
    return this.creditCardRepository.update({ id }, { isPaid: true });
  }
}
