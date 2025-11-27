export class Product {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  categoryId!: number;
  discount?: number;
  inStock!: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
