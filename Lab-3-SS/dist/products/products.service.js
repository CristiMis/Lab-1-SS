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
                name: 'Laptop Pro',
                description: 'High-performance laptop for professionals',
                price: 1299.99,
                stock: 15,
                categoryId: 1,
                sku: 'LAPTOP-PRO-001',
                supplierEmail: 'supplier@techstore.com',
            },
            {
                id: 2,
                name: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse with precision tracking',
                price: 29.99,
                stock: 150,
                categoryId: 2,
                sku: 'MOUSE-WIRELESS-001',
            },
            {
                id: 3,
                name: 'USB-C Cable',
                description: 'Durable USB-C charging and data cable',
                price: 12.99,
                stock: 300,
                categoryId: 2,
                sku: 'CABLE-USBC-001',
            },
        ];
        this.idCounter = 4;
    }
    create(createProductDto) {
        const newProduct = {
            id: this.idCounter++,
            ...createProductDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.products.push(newProduct);
        return newProduct;
    }
    findAll(minPrice, maxPrice) {
        let filtered = [...this.products];
        if (minPrice !== undefined) {
            filtered = filtered.filter((p) => p.price >= minPrice);
        }
        if (maxPrice !== undefined) {
            filtered = filtered.filter((p) => p.price <= maxPrice);
        }
        return filtered;
    }
    findOne(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    findByName(name) {
        if (!name || name.trim().length === 0) {
            throw new common_1.BadRequestException('Name parameter cannot be empty');
        }
        return this.products.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
    }
    findByCategoryId(categoryId) {
        const products = this.products.filter((p) => p.categoryId === categoryId);
        if (products.length === 0) {
            throw new common_1.NotFoundException(`No products found for category ${categoryId}`);
        }
        return products;
    }
    update(id, updateProductDto) {
        const product = this.findOne(id);
        const updated = { ...product, ...updateProductDto, updatedAt: new Date() };
        const index = this.products.findIndex((p) => p.id === id);
        this.products[index] = updated;
        return updated;
    }
    remove(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        this.products.splice(index, 1);
        return { message: 'Product deleted successfully', id };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map