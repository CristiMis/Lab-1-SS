"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
let CategoriesService = class CategoriesService {
    constructor() {
        this.categories = [
            {
                id: 1,
                name: 'Electronics',
                description: 'Electronic devices and accessories',
                color: '#FF5733',
                managerEmail: 'manager@electronics.com',
                icon: '⚡',
            },
            {
                id: 2,
                name: 'Accessories',
                description: 'Computer and mobile accessories',
                color: '#33FF57',
                icon: '🔧',
            },
            {
                id: 3,
                name: 'Storage',
                description: 'Storage solutions and devices',
                color: '#3357FF',
                icon: '💾',
            },
        ];
        this.idCounter = 4;
    }
    create(createCategoryDto) {
        const newCategory = {
            id: this.idCounter++,
            ...createCategoryDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.categories.push(newCategory);
        return newCategory;
    }
    findAll() {
        return this.categories;
    }
    findOne(id) {
        const category = this.categories.find((c) => c.id === id);
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    findByName(name) {
        if (!name || name.trim().length === 0) {
            throw new common_1.BadRequestException('Name parameter cannot be empty');
        }
        return this.categories.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
    }
    update(id, updateCategoryDto) {
        const category = this.findOne(id);
        const updated = {
            ...category,
            ...updateCategoryDto,
            updatedAt: new Date(),
        };
        const index = this.categories.findIndex((c) => c.id === id);
        this.categories[index] = updated;
        return updated;
    }
    remove(id) {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        this.categories.splice(index, 1);
        return { message: 'Category deleted successfully', id };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
//# sourceMappingURL=categories.service.js.map