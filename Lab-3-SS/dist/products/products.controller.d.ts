import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): import("./entities/product.entity").Product;
    findAll(minPrice?: string, maxPrice?: string): import("./entities/product.entity").Product[];
    findByName(name: string): import("./entities/product.entity").Product[];
    findByCategory(categoryId: number): import("./entities/product.entity").Product[];
    findOne(id: number): import("./entities/product.entity").Product;
    update(id: number, updateProductDto: UpdateProductDto): import("./entities/product.entity").Product;
    remove(id: number): {
        message: string;
        id: number;
    };
}
//# sourceMappingURL=products.controller.d.ts.map