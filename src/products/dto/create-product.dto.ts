import {
  IsString,
  IsNumber,
  Min,
  Max,
  Length,
  IsIn,
  IsOptional,
  ValidateIf,
  IsBoolean,
  Validate,
} from 'class-validator';
import { IsValidDiscountConstraint } from '../../common/validators/is-valid-discount.validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 100, {
    message: 'Name must be between 3 and 100 characters',
  })
  name!: string;

  @IsString()
  @Length(10, 500, {
    message: 'Description must be between 10 and 500 characters',
  })
  description!: string;

  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price!: number;

  @IsNumber()
  @Min(0, { message: 'Stock cannot be negative' })
  stock!: number;

  @IsNumber()
  categoryId!: number;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @IsBoolean()
  @IsOptional()
  hasDiscount?: boolean;

  @IsNumber()
  @ValidateIf((o) => o.hasDiscount === true)
  @Validate(IsValidDiscountConstraint)
  @IsOptional()
  discount?: number;

  @IsString()
  @ValidateIf((o) => o.hasDiscount === true)
  @Length(5, 100, {
    message: 'Discount reason must be between 5 and 100 characters',
  })
  @IsOptional()
  discountReason?: string;
}
