import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateCreditCardDto } from 'src/credit_cards/dtos/CreateCreditCardDto';
import { CreditCardsService } from '../services/credit_cards.service';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private creditCardService: CreditCardsService) {}

  @Get()
  async getCreditCards() {
    const creditCards = await this.creditCardService.findCreditCards();
    return creditCards;
  }

  @Get(':id')
  async getCreditCardBy(@Param('id', ParseIntPipe) id: number) {
    const creditCard = await this.creditCardService.findCreditCardById(id);
    return creditCard;
  }

  @Post()
  async createCreditCard(@Body() createCreditCardDto: CreateCreditCardDto) {
    return await this.creditCardService.createCreditCard(createCreditCardDto);
  }
}
