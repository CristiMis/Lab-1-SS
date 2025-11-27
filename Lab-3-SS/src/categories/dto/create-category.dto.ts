import { IsString, IsEmail, IsOptional, Length, ValidateIf } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Name must be a string' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @Length(10, 200, { message: 'Description must be between 10 and 200 characters' })
  description: string;

  @IsOptional()
  @IsString({ message: 'Color must be a string if provided' })
  @Length(2, 30, { message: 'Color must be between 2 and 30 characters' })
  color?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Manager email must be valid if provided' })
  @ValidateIf((obj) => obj.managerEmail !== undefined)
  managerEmail?: string;

  @IsOptional()
  @IsString({ message: 'Icon must be a string if provided' })
  icon?: string;
}
