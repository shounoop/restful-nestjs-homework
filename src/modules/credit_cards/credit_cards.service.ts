import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from 'src/typeorm/entities/CreditCard';
import { Repository } from 'typeorm';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { CreateCreditCardParams } from './types';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}

  findCreditCards() {
    return this.creditCardRepository.find();
  }

  findCreditCardById(id: number) {
    return this.creditCardRepository.findOneBy({ id });
  }

  createCreditCard(creditCardDetails: CreateCreditCardParams) {
    const newCreditCard = this.creditCardRepository.create({
      ...creditCardDetails,
      expirationDate: new Date(),
      cvc: uuidv4(),
    });

    return this.creditCardRepository.save(newCreditCard);
  }
}
