import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    importCSV(file: any): Promise<{
        imported: number;
        failed: number;
        invalidRecords: Array<{
            rowIndex: number;
            data: Record<string, string>;
            errors: string[];
        }>;
        message: string;
    }>;
    exportCSV(minPrice?: string, maxPrice?: string, categoryId?: string, inStock?: string, res?: any): void;
    create(createProductDto: CreateProductDto): import("./entities/product.entity").Product;
    findAll(minPrice?: string, maxPrice?: string, categoryId?: string, inStock?: string): import("./entities/product.entity").Product[];
    findOne(id: number): import("./entities/product.entity").Product;
    update(id: number, updateProductDto: UpdateProductDto): import("./entities/product.entity").Product;
    remove(id: number): {
        message: string;
        id: number;
    };
}
//# sourceMappingURL=products.controller.d.ts.map