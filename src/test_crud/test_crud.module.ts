import { Module } from '@nestjs/common';
import { TestCrudService } from './test_crud.service';
import { TestCrudController } from './test_crud.controller';

@Module({
  controllers: [TestCrudController],
  providers: [TestCrudService]
})
export class TestCrudModule {}
