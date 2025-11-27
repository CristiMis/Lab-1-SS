"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const file_validation_pipe_1 = require("../common/pipes/file-validation.pipe");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async importCSV(file) {
        // Validate file using pipe
        new file_validation_pipe_1.FileValidationPipe().transform({ file }, {});
        try {
            const result = await this.productsService.importFromCSV(file.buffer);
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to import CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    exportCSV(minPrice, maxPrice, categoryId, inStock, res) {
        const query = {};
        if (minPrice) {
            const parsedMinPrice = parseFloat(minPrice);
            if (isNaN(parsedMinPrice)) {
                throw new common_1.BadRequestException('minPrice must be a valid number');
            }
            query.minPrice = parsedMinPrice;
        }
        if (maxPrice) {
            const parsedMaxPrice = parseFloat(maxPrice);
            if (isNaN(parsedMaxPrice)) {
                throw new common_1.BadRequestException('maxPrice must be a valid number');
            }
            query.maxPrice = parsedMaxPrice;
        }
        if (categoryId) {
            const parsedCategoryId = parseInt(categoryId, 10);
            if (isNaN(parsedCategoryId)) {
                throw new common_1.BadRequestException('categoryId must be a valid integer');
            }
            query.categoryId = parsedCategoryId;
        }
        if (inStock !== undefined && inStock !== '') {
            if (inStock !== 'true' && inStock !== 'false') {
                throw new common_1.BadRequestException('inStock must be true or false');
            }
            query.inStock = inStock === 'true';
        }
        const csv = this.productsService.exportToCSV(Object.keys(query).length > 0 ? query : undefined);
        // Set response headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
        res.send(csv);
    }
    create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll(minPrice, maxPrice, categoryId, inStock) {
        const query = {};
        if (minPrice) {
            const parsedMinPrice = parseFloat(minPrice);
            if (isNaN(parsedMinPrice)) {
                throw new common_1.BadRequestException('minPrice must be a valid number');
            }
            query.minPrice = parsedMinPrice;
        }
        if (maxPrice) {
            const parsedMaxPrice = parseFloat(maxPrice);
            if (isNaN(parsedMaxPrice)) {
                throw new common_1.BadRequestException('maxPrice must be a valid number');
            }
            query.maxPrice = parsedMaxPrice;
        }
        if (categoryId) {
            const parsedCategoryId = parseInt(categoryId, 10);
            if (isNaN(parsedCategoryId)) {
                throw new common_1.BadRequestException('categoryId must be a valid integer');
            }
            query.categoryId = parsedCategoryId;
        }
        if (inStock !== undefined && inStock !== '') {
            if (inStock !== 'true' && inStock !== 'false') {
                throw new common_1.BadRequestException('inStock must be true or false');
            }
            query.inStock = inStock === 'true';
        }
        return this.productsService.findByQuery(query);
    }
    findOne(id) {
        const product = this.productsService.findOne(id);
        if (!product) {
            throw new common_1.BadRequestException(`Product with id ${id} not found`);
        }
        return product;
    }
    update(id, updateProductDto) {
        const product = this.productsService.update(id, updateProductDto);
        if (!product) {
            throw new common_1.BadRequestException(`Product with id ${id} not found`);
        }
        return product;
    }
    remove(id) {
        const removed = this.productsService.remove(id);
        if (!removed) {
            throw new common_1.BadRequestException(`Product with id ${id} not found`);
        }
        return { message: 'Product deleted successfully', id };
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "importCSV", null);
__decorate([
    (0, common_1.Get)('export'),
    __param(0, (0, common_1.Query)('minPrice')),
    __param(1, (0, common_1.Query)('maxPrice')),
    __param(2, (0, common_1.Query)('categoryId')),
    __param(3, (0, common_1.Query)('inStock')),
    __param(4, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "exportCSV", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('minPrice')),
    __param(1, (0, common_1.Query)('maxPrice')),
    __param(2, (0, common_1.Query)('categoryId')),
    __param(3, (0, common_1.Query)('inStock')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map