import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditCard } from 'src/typeorm/entities/CreditCard';
import { User } from 'src/typeorm/entities/User';
import { CreditCardsModule } from '../credit_cards/credit_cards.module';
import { UsersModule } from '../users/users.module';
import { TestCrudModule } from '../test_crud/test_crud.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'restful_homework',
      entities: [CreditCard, User],
      synchronize: true,
    }),
    CreditCardsModule,
    UsersModule,
    TestCrudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
