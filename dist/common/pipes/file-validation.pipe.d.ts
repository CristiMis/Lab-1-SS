import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class FileValidationPipe implements PipeTransform {
    private expectedColumnCount;
    constructor(expectedColumnCount?: number);
    transform(value: any, metadata: ArgumentMetadata): any;
}
//# sourceMappingURL=file-validation.pipe.d.ts.map