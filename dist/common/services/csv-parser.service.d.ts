export declare class CsvParserService {
    /**
     * Parses CSV file buffer into array of rows
     */
    parseCSV(fileBuffer: Buffer): string[][];
    /**
     * Validates CSV data against DTO
     * Returns object with valid records and error details for invalid ones
     */
    validateRows<T>(rows: string[][], dtoClass: new () => T, columnMapping: string[]): Promise<{
        validRecords: T[];
        invalidRecords: Array<{
            rowIndex: number;
            data: Record<string, any>;
            errors: string[];
        }>;
        totalProcessed: number;
    }>;
    /**
     * Converts CSV array to object using column mapping and converts types
     */
    private mapRowToObject;
    /**
     * Converts array of objects to CSV format
     */
    convertToCSV<T>(records: T[], columns: string[]): string;
}
//# sourceMappingURL=csv-parser.service.d.ts.map