"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'Laptop Dell XPS',
                description: 'Powerful laptop for developers',
                price: 1299.99,
                stock: 50,
                categoryId: 1,
                discount: 10,
                inStock: true,
            },
            {
                id: 2,
                name: 'iPhone 15',
                description: 'Latest Apple smartphone with advanced features',
                price: 999.99,
                stock: 100,
                categoryId: 2,
                inStock: true,
            },
            {
                id: 3,
                name: 'Samsung Galaxy',
                description: 'Premium Android smartphone with excellent camera',
                price: 899.99,
                stock: 75,
                categoryId: 2,
                inStock: true,
            },
        ];
        this.nextId = 4;
    }
    create(createProductDto) {
        const product = {
            id: this.nextId++,
            ...createProductDto,
            inStock: createProductDto.inStock ?? true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.products.push(product);
        return product;
    }
    findAll() {
        return this.products;
    }
    findOne(id) {
        return this.products.find((p) => p.id === id);
    }
    findByQuery(query) {
        let result = this.products;
        if (query.minPrice) {
            result = result.filter((p) => p.price >= query.minPrice);
        }
        if (query.maxPrice) {
            result = result.filter((p) => p.price <= query.maxPrice);
        }
        if (query.categoryId) {
            result = result.filter((p) => p.categoryId === query.categoryId);
        }
        if (query.inStock !== undefined) {
            result = result.filter((p) => p.inStock === query.inStock);
        }
        return result;
    }
    update(id, updateProductDto) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            return undefined;
        }
        this.products[index] = {
            ...this.products[index],
            ...updateProductDto,
            updatedAt: new Date(),
        };
        return this.products[index];
    }
    remove(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            return false;
        }
        this.products.splice(index, 1);
        return true;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map