import { CreateCategoryDto } from './create-category.dto';
declare const UpdateCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
    name?: string;
    description?: string;
    color?: string;
    managerEmail?: string;
    icon?: string;
}
export {};
//# sourceMappingURL=update-category.dto.d.ts.map