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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
