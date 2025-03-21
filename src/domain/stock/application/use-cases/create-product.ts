import { Product } from '@/domain/stock/enterprise/entities/product';
import { ProductsRepository } from '../repositories/products-repository';

interface CreateProductRequest {
  name: string;
  description: string;
  quantity: number;
  minimumQuantity: number;
  size?: string;
  color?: string;
  price: number;
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(request: CreateProductRequest) {
    const product = new Product({
      ...request,
      createdAt: new Date(),
    });

    await this.productsRepository.create(product);
    return product;
  }
}
