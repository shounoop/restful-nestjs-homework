import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from 'src/typeorm/entities/CreditCard';
import { CreditCardsController } from './controllers/credit_cards.controller';
import { CreditCardsService } from './services/credit_cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  controllers: [CreditCardsController],
  providers: [CreditCardsService],
})
export class CreditCardsModule {}
