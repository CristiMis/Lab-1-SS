import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CsvParserService } from '../common/services/csv-parser.service';

@Injectable()
export class ProductsService {
  constructor(private readonly csvParserService: CsvParserService) {}
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

  /**
   * Imports products from CSV file
   */
  async importFromCSV(
    fileBuffer: Buffer,
  ): Promise<{
    imported: number;
    failed: number;
    invalidRecords: Array<{
      rowIndex: number;
      data: Record<string, string>;
      errors: string[];
    }>;
    message: string;
  }> {
    // Parse CSV
    const rows = this.csvParserService.parseCSV(fileBuffer);

    if (rows.length < 2) {
      throw new Error('CSV file must contain at least a header and one data row');
    }

    // Column mapping - expected columns in DTO
    const columnMapping = [
      'name',
      'description',
      'price',
      'stock',
      'categoryId',
      'inStock',
      'hasDiscount',
      'discount',
    ];

    // Validate rows against CreateProductDto
    const validationResult = await this.csvParserService.validateRows(
      rows,
      CreateProductDto,
      columnMapping,
    );

    // Create valid products
    const createdProducts: Product[] = [];
    for (const validRecord of validationResult.validRecords) {
      const product = this.create(validRecord as CreateProductDto);
      createdProducts.push(product);
    }

    return {
      imported: createdProducts.length,
      failed: validationResult.invalidRecords.length,
      invalidRecords: validationResult.invalidRecords,
      message: `Successfully imported ${createdProducts.length} products. ${validationResult.invalidRecords.length} records had validation errors.`,
    };
  }

  /**
   * Exports products to CSV format with optional filtering
   */
  exportToCSV(query?: {
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
    inStock?: boolean;
  }): string {
    // Get filtered products
    let productsToExport = this.products;

    if (query) {
      productsToExport = this.findByQuery(query);
    }

    // Define columns to export (exclude sensitive fields)
    const columns = [
      'id',
      'name',
      'description',
      'price',
      'stock',
      'categoryId',
      'inStock',
      'discount',
      'createdAt',
      'updatedAt',
    ];

    // Convert to CSV
    return this.csvParserService.convertToCSV(productsToExport, columns);
  }
}
