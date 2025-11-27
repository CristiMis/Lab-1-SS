import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileValidationPipe } from '../common/pipes/file-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importCSV(
    @UploadedFile() file: any,
  ) {
    // Validate file using pipe
    new FileValidationPipe().transform({ file }, {} as any);

    try {
      const result = await this.productsService.importFromCSV(file.buffer);
      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to import CSV: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  @Get('export')
  exportCSV(
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('categoryId') categoryId?: string,
    @Query('inStock') inStock?: string,
    @Response() res?: any,
  ) {
    const query: any = {};

    if (minPrice) {
      const parsedMinPrice = parseFloat(minPrice);
      if (isNaN(parsedMinPrice)) {
        throw new BadRequestException('minPrice must be a valid number');
      }
      query.minPrice = parsedMinPrice;
    }

    if (maxPrice) {
      const parsedMaxPrice = parseFloat(maxPrice);
      if (isNaN(parsedMaxPrice)) {
        throw new BadRequestException('maxPrice must be a valid number');
      }
      query.maxPrice = parsedMaxPrice;
    }

    if (categoryId) {
      const parsedCategoryId = parseInt(categoryId, 10);
      if (isNaN(parsedCategoryId)) {
        throw new BadRequestException('categoryId must be a valid integer');
      }
      query.categoryId = parsedCategoryId;
    }

    if (inStock !== undefined && inStock !== '') {
      if (inStock !== 'true' && inStock !== 'false') {
        throw new BadRequestException('inStock must be true or false');
      }
      query.inStock = inStock === 'true';
    }

    const csv = this.productsService.exportToCSV(
      Object.keys(query).length > 0 ? query : undefined,
    );

    // Set response headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
    res.send(csv);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('categoryId') categoryId?: string,
    @Query('inStock') inStock?: string,
  ) {
    const query: any = {};

    if (minPrice) {
      const parsedMinPrice = parseFloat(minPrice);
      if (isNaN(parsedMinPrice)) {
        throw new BadRequestException('minPrice must be a valid number');
      }
      query.minPrice = parsedMinPrice;
    }

    if (maxPrice) {
      const parsedMaxPrice = parseFloat(maxPrice);
      if (isNaN(parsedMaxPrice)) {
        throw new BadRequestException('maxPrice must be a valid number');
      }
      query.maxPrice = parsedMaxPrice;
    }

    if (categoryId) {
      const parsedCategoryId = parseInt(categoryId, 10);
      if (isNaN(parsedCategoryId)) {
        throw new BadRequestException('categoryId must be a valid integer');
      }
      query.categoryId = parsedCategoryId;
    }

    if (inStock !== undefined && inStock !== '') {
      if (inStock !== 'true' && inStock !== 'false') {
        throw new BadRequestException('inStock must be true or false');
      }
      query.inStock = inStock === 'true';
    }

    return this.productsService.findByQuery(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const product = this.productsService.findOne(id);
    if (!product) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = this.productsService.update(id, updateProductDto);
    if (!product) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const removed = this.productsService.remove(id);
    if (!removed) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
    return { message: 'Product deleted successfully', id };
  }
}
