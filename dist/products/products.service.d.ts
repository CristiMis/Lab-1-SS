import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CsvParserService } from '../common/services/csv-parser.service';
export declare class ProductsService {
    private readonly csvParserService;
    constructor(csvParserService: CsvParserService);
    private products;
    private nextId;
    create(createProductDto: CreateProductDto): Product;
    findAll(): Product[];
    findOne(id: number): Product | undefined;
    findByQuery(query: {
        minPrice?: number;
        maxPrice?: number;
        categoryId?: number;
        inStock?: boolean;
    }): Product[];
    update(id: number, updateProductDto: UpdateProductDto): Product | undefined;
    remove(id: number): boolean;
    /**
     * Imports products from CSV file
     */
    importFromCSV(fileBuffer: Buffer): Promise<{
        imported: number;
        failed: number;
        invalidRecords: Array<{
            rowIndex: number;
            data: Record<string, string>;
            errors: string[];
        }>;
        message: string;
    }>;
    /**
     * Exports products to CSV format with optional filtering
     */
    exportToCSV(query?: {
        minPrice?: number;
        maxPrice?: number;
        categoryId?: number;
        inStock?: boolean;
    }): string;
}
//# sourceMappingURL=products.service.d.ts.map