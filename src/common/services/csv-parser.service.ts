import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CsvParserService {
  /**
   * Parses CSV file buffer into array of rows
   */
  parseCSV(fileBuffer: Buffer): string[][] {
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
  async validateRows<T>(
    rows: string[][],
    dtoClass: new () => T,
    columnMapping: string[],
  ): Promise<{
    validRecords: T[];
    invalidRecords: Array<{
      rowIndex: number;
      data: Record<string, any>;
      errors: string[];
    }>;
    totalProcessed: number;
  }> {
    const validRecords: T[] = [];
    const invalidRecords: Array<{
      rowIndex: number;
      data: Record<string, any>;
      errors: string[];
    }> = [];

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
      const instance = plainToClass(dtoClass, rowData);
      const errors = await validate(instance as object);

      if (errors.length > 0) {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints || {}).join(', '),
        );
        invalidRecords.push({
          rowIndex,
          data: rowData,
          errors: errorMessages,
        });
      } else {
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
  private mapRowToObject(
    row: string[],
    columnMapping: string[],
  ): Record<string, string | number | boolean> {
    const obj: Record<string, string | number | boolean> = {};
    columnMapping.forEach((column, index) => {
      const value = row[index] || '';
      
      // Try to convert to appropriate type
      if (column === 'price' || column === 'stock' || column === 'categoryId' || column === 'discount') {
        obj[column] = value === '' ? '' : (isNaN(Number(value)) ? value : Number(value));
      } else if (column === 'inStock' || column === 'hasDiscount') {
        obj[column] = value === 'true' ? true : (value === 'false' ? false : value);
      } else {
        obj[column] = value;
      }
    });
    return obj;
  }

  /**
   * Converts array of objects to CSV format
   */
  convertToCSV<T>(records: T[], columns: string[]): string {
    // Header row
    const headerRow = columns.join(',');

    // Data rows
    const dataRows = records.map((record) => {
      return columns
        .map((column) => {
          const value = (record as any)[column] || '';
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
}
