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
                description: 'All electronic devices and gadgets',
                status: 'active',
            },
            {
                id: 2,
                name: 'Smartphones',
                description: 'Mobile phones and related accessories',
                status: 'active',
                parentCategoryId: 1,
            },
            {
                id: 3,
                name: 'Computers',
                description: 'Laptops, desktops and related devices',
                status: 'active',
                parentCategoryId: 1,
            },
        ];
        this.nextId = 4;
    }
    create(createCategoryDto) {
        const category = {
            id: this.nextId++,
            ...createCategoryDto,
            status: createCategoryDto.status ?? 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.categories.push(category);
        return category;
    }
    findAll() {
        return this.categories;
    }
    findOne(id) {
        return this.categories.find((c) => c.id === id);
    }
    update(id, updateCategoryDto) {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index === -1) {
            return undefined;
        }
        this.categories[index] = {
            ...this.categories[index],
            ...updateCategoryDto,
            updatedAt: new Date(),
        };
        return this.categories[index];
    }
    remove(id) {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index === -1) {
            return false;
        }
        this.categories.splice(index, 1);
        return true;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
//# sourceMappingURL=categories.service.js.map