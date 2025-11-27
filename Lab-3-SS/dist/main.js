"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        exceptionFactory: (errors) => {
            const messages = errors.map((error) => {
                return {
                    field: error.property,
                    constraints: error.constraints,
                    children: error.children,
                };
            });
            return new common_1.BadRequestException({
                statusCode: 400,
                message: 'Validation failed',
                errors: messages,
            });
        },
    }));
    await app.listen(3000, () => {
        console.log('NestJS server is running on http://localhost:3000');
        console.log('API Documentation:');
        console.log('  Products: http://localhost:3000/products');
        console.log('  Categories: http://localhost:3000/categories');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map