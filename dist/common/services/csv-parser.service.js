"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParserService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let CsvParserService = class CsvParserService {
    /**
     * Parses CSV file buffer into array of rows
     */
    parseCSV(fileBuffer) {
        const csvText = fileBuffer.toString('utf-8');
        const rows = csvText
            .split('\n')
            .filter((row) => row.trim()) // Remove empty rows
            .map((row) => row.split(',').map((cell) => cell.trim()));
        return rows;
    }
    /**
     * Validates CSV data against DTO
     * Returns object with valid records and error details for invalid ones
     */
    async validateRows(rows, dtoClass, columnMapping) {
        const validRecords = [];
        const invalidRecords = [];
        // Skip header row if present (index 0)
        const dataRows = rows.slice(1);
        for (let i = 0; i < dataRows.length; i++) {
            const row = dataRows[i];
            const rowIndex = i + 2; // +2 because we skip header and 1-indexed
            // Check if row has correct number of columns
            if (row.length !== columnMapping.length) {
                invalidRecords.push({
                    rowIndex,
                    data: this.mapRowToObject(row, columnMapping),
                    errors: [
                        `Expected ${columnMapping.length} columns, got ${row.length}`,
                    ],
                });
                continue;
            }
            // Map row to object
            const rowData = this.mapRowToObject(row, columnMapping);
            // Create instance and validate
            const instance = (0, class_transformer_1.plainToClass)(dtoClass, rowData);
            const errors = await (0, class_validator_1.validate)(instance);
            if (errors.length > 0) {
                const errorMessages = errors.map((error) => Object.values(error.constraints || {}).join(', '));
                invalidRecords.push({
                    rowIndex,
                    data: rowData,
                    errors: errorMessages,
                });
            }
            else {
                validRecords.push(instance);
            }
        }
        return {
            validRecords,
            invalidRecords,
            totalProcessed: dataRows.length,
        };
    }
    /**
     * Converts CSV array to object using column mapping and converts types
     */
    mapRowToObject(row, columnMapping) {
        const obj = {};
        columnMapping.forEach((column, index) => {
            const value = row[index] || '';
            // Try to convert to appropriate type
            if (column === 'price' || column === 'stock' || column === 'categoryId' || column === 'discount') {
                obj[column] = value === '' ? '' : (isNaN(Number(value)) ? value : Number(value));
            }
            else if (column === 'inStock' || column === 'hasDiscount') {
                obj[column] = value === 'true' ? true : (value === 'false' ? false : value);
            }
            else {
                obj[column] = value;
            }
        });
        return obj;
    }
    /**
     * Converts array of objects to CSV format
     */
    convertToCSV(records, columns) {
        // Header row
        const headerRow = columns.join(',');
        // Data rows
        const dataRows = records.map((record) => {
            return columns
                .map((column) => {
                const value = record[column] || '';
                // Escape quotes and wrap in quotes if contains comma or quote
                const stringValue = String(value);
                if (stringValue.includes(',') || stringValue.includes('"')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            })
                .join(',');
        });
        return [headerRow, ...dataRows].join('\n');
    }
};
exports.CsvParserService = CsvParserService;
exports.CsvParserService = CsvParserService = __decorate([
    (0, common_1.Injectable)()
], CsvParserService);
//# sourceMappingURL=csv-parser.service.js.map