import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
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
}
//# sourceMappingURL=products.service.d.ts.map