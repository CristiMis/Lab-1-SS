import { IsString, IsNumber, IsOptional, Length, Min, ValidateIf, IsEmail } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @Length(10, 500, { message: 'Description must be between 10 and 500 characters' })
  description: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;

  @IsNumber({}, { message: 'Category ID must be a number' })
  @Min(1, { message: 'Category ID must be valid' })
  categoryId: number;

  @IsOptional()
  @IsString({ message: 'SKU must be a string if provided' })
  @Length(3, 50, { message: 'SKU must be between 3 and 50 characters' })
  sku?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Supplier email must be valid if provided' })
  @ValidateIf((obj) => obj.supplierEmail !== undefined)
  supplierEmail?: string;
}
