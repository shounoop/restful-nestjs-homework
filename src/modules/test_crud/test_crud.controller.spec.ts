import { Test, TestingModule } from '@nestjs/testing';
import { TestCrudController } from './test_crud.controller';
import { TestCrudService } from './test_crud.service';

describe('TestCrudController', () => {
  let controller: TestCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCrudController],
      providers: [TestCrudService],
    }).compile();

    controller = module.get<TestCrudController>(TestCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
