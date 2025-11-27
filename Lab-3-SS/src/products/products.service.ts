import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      stock: 15,
      categoryId: 1,
      sku: 'LAPTOP-PRO-001',
      supplierEmail: 'supplier@techstore.com',
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with precision tracking',
      price: 29.99,
      stock: 150,
      categoryId: 2,
      sku: 'MOUSE-WIRELESS-001',
    },
    {
      id: 3,
      name: 'USB-C Cable',
      description: 'Durable USB-C charging and data cable',
      price: 12.99,
      stock: 300,
      categoryId: 2,
      sku: 'CABLE-USBC-001',
    },
  ];

  private idCounter = 4;

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.idCounter++,
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(newProduct);
    return newProduct;
  }

  findAll(minPrice?: number, maxPrice?: number): Product[] {
    let filtered = [...this.products];

    if (minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    return filtered;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  findByName(name: string): Product[] {
    if (!name || name.trim().length === 0) {
      throw new BadRequestException('Name parameter cannot be empty');
    }
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findByCategoryId(categoryId: number): Product[] {
    const products = this.products.filter((p) => p.categoryId === categoryId);
    if (products.length === 0) {
      throw new NotFoundException(
        `No products found for category ${categoryId}`,
      );
    }
    return products;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    const updated = { ...product, ...updateProductDto, updatedAt: new Date() };
    const index = this.products.findIndex((p) => p.id === id);
    this.products[index] = updated;
    return updated;
  }

  remove(id: number): { message: string; id: number } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.products.splice(index, 1);
    return { message: 'Product deleted successfully', id };
  }
}
