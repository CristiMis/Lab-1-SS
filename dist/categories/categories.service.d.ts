import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
export declare class CategoriesService {
    private categories;
    private nextId;
    create(createCategoryDto: CreateCategoryDto): Category;
    findAll(): Category[];
    findOne(id: number): Category | undefined;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Category | undefined;
    remove(id: number): boolean;
}
//# sourceMappingURL=categories.service.d.ts.map