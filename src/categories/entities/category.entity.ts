export class Category {
  id!: number;
  name!: string;
  description!: string;
  status!: 'active' | 'inactive';
  parentCategoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
