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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ['text/csv', 'application/octet-stream']; // Accept octet-stream for CLI tools
let FileValidationPipe = class FileValidationPipe {
    constructor(expectedColumnCount) {
        this.expectedColumnCount = expectedColumnCount || 0;
    }
    transform(value, metadata) {
        if (!value || !value.file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const file = value.file;
        // Validate MIME type (also accept octet-stream from curl)
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Invalid file type. Expected text/csv, received ${file.mimetype}`);
        }
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            throw new common_1.BadRequestException(`File size exceeds maximum allowed size of 2MB. Received: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        }
        // Validate file extension
        const filename = file.originalname;
        if (!filename.endsWith('.csv')) {
            throw new common_1.BadRequestException('File must have .csv extension');
        }
        return value;
    }
};
exports.FileValidationPipe = FileValidationPipe;
exports.FileValidationPipe = FileValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Number])
], FileValidationPipe);
//# sourceMappingURL=file-validation.pipe.js.map