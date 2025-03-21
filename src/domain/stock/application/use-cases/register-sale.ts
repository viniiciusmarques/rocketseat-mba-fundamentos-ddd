import { ProductsRepository } from '../repositories/products-repository';
import { SalesRepository } from '../repositories/sales-repository';
import { Sale } from '@/domain/stock/enterprise/entities/sale';

interface RegisterSaleRequest {
  productId: string;
  quantitySold: number;
  totalPrice: number;
}

export class RegisterSaleUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private salesRepository: SalesRepository
  ) {}

  async execute(request: RegisterSaleRequest) {
    const product = await this.productsRepository.findById(request.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    product.decreaseQuantity(request.quantitySold);
    await this.productsRepository.update(product);

    const sale = new Sale({
      ...request,
      soldAt: new Date(),
    });

    await this.salesRepository.create(sale);
    return sale;
  }
}
