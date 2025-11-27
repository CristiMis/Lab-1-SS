import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop Dell XPS',
      description: 'Powerful laptop for developers',
      price: 1299.99,
      stock: 50,
      categoryId: 1,
      discount: 10,
      inStock: true,
    },
    {
      id: 2,
      name: 'iPhone 15',
      description: 'Latest Apple smartphone with advanced features',
      price: 999.99,
      stock: 100,
      categoryId: 2,
      inStock: true,
    },
    {
      id: 3,
      name: 'Samsung Galaxy',
      description: 'Premium Android smartphone with excellent camera',
      price: 899.99,
      stock: 75,
      categoryId: 2,
      inStock: true,
    },
  ];

  private nextId = 4;

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      ...createProductDto,
      inStock: createProductDto.inStock ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  findByQuery(query: {
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
    inStock?: boolean;
  }): Product[] {
    let result = this.products;

    if (query.minPrice) {
      result = result.filter((p) => p.price >= query.minPrice!);
    }

    if (query.maxPrice) {
      result = result.filter((p) => p.price <= query.maxPrice!);
    }

    if (query.categoryId) {
      result = result.filter((p) => p.categoryId === query.categoryId);
    }

    if (query.inStock !== undefined) {
      result = result.filter((p) => p.inStock === query.inStock);
    }

    return result;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product | undefined {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return undefined;
    }
    this.products[index] = {
      ...this.products[index],
      ...updateProductDto,
      updatedAt: new Date(),
    };
    return this.products[index];
  }

  remove(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return false;
    }
    this.products.splice(index, 1);
    return true;
  }
}
