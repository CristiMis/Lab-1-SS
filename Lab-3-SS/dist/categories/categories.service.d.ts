import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
export declare class CategoriesService {
    private categories;
    private idCounter;
    create(createCategoryDto: CreateCategoryDto): Category;
    findAll(): Category[];
    findOne(id: number): Category;
    findByName(name: string): Category[];
    update(id: number, updateCategoryDto: UpdateCategoryDto): Category;
    remove(id: number): {
        message: string;
        id: number;
    };
}
//# sourceMappingURL=categories.service.d.ts.map