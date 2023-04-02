import { PartialType } from '@nestjs/mapped-types';
import { CreateTestCrudDto } from './create-test_crud.dto';

export class UpdateTestCrudDto extends PartialType(CreateTestCrudDto) {}
