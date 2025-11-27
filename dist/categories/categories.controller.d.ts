import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): import("./entities/category.entity").Category;
    findAll(): import("./entities/category.entity").Category[];
    findOne(id: number): import("./entities/category.entity").Category;
    update(id: number, updateCategoryDto: UpdateCategoryDto): import("./entities/category.entity").Category;
    remove(id: number): {
        message: string;
        id: number;
    };
}
//# sourceMappingURL=categories.controller.d.ts.map