import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ['text/csv', 'application/octet-stream']; // Accept octet-stream for CLI tools

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private expectedColumnCount: number;

  constructor(expectedColumnCount?: number) {
    this.expectedColumnCount = expectedColumnCount || 0;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !value.file) {
      throw new BadRequestException('No file uploaded');
    }

    const file = value.file;

    // Validate MIME type (also accept octet-stream from curl)
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Expected text/csv, received ${file.mimetype}`,
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size of 2MB. Received: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
      );
    }

    // Validate file extension
    const filename = file.originalname;
    if (!filename.endsWith('.csv')) {
      throw new BadRequestException(
        'File must have .csv extension',
      );
    }

    return value;
  }
}
