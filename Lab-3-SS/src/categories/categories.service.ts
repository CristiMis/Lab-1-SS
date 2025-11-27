import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      color: '#FF5733',
      managerEmail: 'manager@electronics.com',
      icon: '⚡',
    },
    {
      id: 2,
      name: 'Accessories',
      description: 'Computer and mobile accessories',
      color: '#33FF57',
      icon: '🔧',
    },
    {
      id: 3,
      name: 'Storage',
      description: 'Storage solutions and devices',
      color: '#3357FF',
      icon: '💾',
    },
  ];

  private idCounter = 4;

  create(createCategoryDto: CreateCategoryDto): Category {
    const newCategory: Category = {
      id: this.idCounter++,
      ...createCategoryDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number): Category {
    const category = this.categories.find((c) => c.id === id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  findByName(name: string): Category[] {
    if (!name || name.trim().length === 0) {
      throw new BadRequestException('Name parameter cannot be empty');
    }
    return this.categories.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Category {
    const category = this.findOne(id);
    const updated = {
      ...category,
      ...updateCategoryDto,
      updatedAt: new Date(),
    };
    const index = this.categories.findIndex((c) => c.id === id);
    this.categories[index] = updated;
    return updated;
  }

  remove(id: number): { message: string; id: number } {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    this.categories.splice(index, 1);
    return { message: 'Category deleted successfully', id };
  }
}
