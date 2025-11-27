import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Electronics',
      description: 'All electronic devices and gadgets',
      status: 'active',
    },
    {
      id: 2,
      name: 'Smartphones',
      description: 'Mobile phones and related accessories',
      status: 'active',
      parentCategoryId: 1,
    },
    {
      id: 3,
      name: 'Computers',
      description: 'Laptops, desktops and related devices',
      status: 'active',
      parentCategoryId: 1,
    },
  ];

  private nextId = 4;

  create(createCategoryDto: CreateCategoryDto): Category {
    const category: Category = {
      id: this.nextId++,
      ...createCategoryDto,
      status: createCategoryDto.status ?? 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.categories.push(category);
    return category;
  }

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Category | undefined {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) {
      return undefined;
    }
    this.categories[index] = {
      ...this.categories[index],
      ...updateCategoryDto,
      updatedAt: new Date(),
    };
    return this.categories[index];
  }

  remove(id: number): boolean {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) {
      return false;
    }
    this.categories.splice(index, 1);
    return true;
  }
}
