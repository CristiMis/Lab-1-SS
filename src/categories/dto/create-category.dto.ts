import {
  IsString,
  IsOptional,
  Length,
  IsIn,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(3, 100, {
    message: 'Category name must be between 3 and 100 characters',
  })
  name!: string;

  @IsString()
  @Length(10, 500, {
    message: 'Description must be between 10 and 500 characters',
  })
  description!: string;

  @IsIn(['active', 'inactive'])
  @IsOptional()
  status?: 'active' | 'inactive';

  @IsOptional()
  parentCategoryId?: number;
}
