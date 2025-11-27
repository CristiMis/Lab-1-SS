import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private products;
    private idCounter;
    create(createProductDto: CreateProductDto): Product;
    findAll(minPrice?: number, maxPrice?: number): Product[];
    findOne(id: number): Product;
    findByName(name: string): Product[];
    findByCategoryId(categoryId: number): Product[];
    update(id: number, updateProductDto: UpdateProductDto): Product;
    remove(id: number): {
        message: string;
        id: number;
    };
}
//# sourceMappingURL=products.service.d.ts.map