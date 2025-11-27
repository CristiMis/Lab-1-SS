import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CsvParserService } from '../common/services/csv-parser.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CsvParserService],
})
export class ProductsModule {}
