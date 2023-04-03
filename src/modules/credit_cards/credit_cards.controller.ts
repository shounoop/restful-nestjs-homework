import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreditCardsService } from './credit_cards.service';
import { CreateCreditCardDto } from './dtos/CreateCreditCardDto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private creditCardService: CreditCardsService) {}

  @Get()
  async getCreditCards() {
    const creditCards = await this.creditCardService.findCreditCards();
    return creditCards;
  }

  @Get(':id')
  async getCreditCardById(@Param('id', ParseIntPipe) id: number) {
    const creditCard = await this.creditCardService.findCreditCardById(id);
    return creditCard;
  }

  @Put(':id')
  async payment(@Param('id', ParseIntPipe) id: number) {
    await this.creditCardService.handerPayment(id);

    const creditCard = await this.creditCardService.findCreditCardById(id);
    return creditCard;
  }

  @Post()
  async createCreditCard(@Body() createCreditCardDto: CreateCreditCardDto) {
    return await this.creditCardService.createCreditCard(createCreditCardDto);
  }
}
