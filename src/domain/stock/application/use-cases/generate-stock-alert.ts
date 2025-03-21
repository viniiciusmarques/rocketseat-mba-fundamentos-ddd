import { ProductsRepository } from '../repositories/products-repository';
import { StockAlertsRepository } from '../repositories/stock-alerts-repository';
import { StockAlert } from '@/domain/stock/enterprise/entities/stock-alert';

interface GenerateStockAlertRequest {
  productId: string;
}

export class GenerateStockAlertUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private stockAlertsRepository: StockAlertsRepository
  ) {}

  async execute(request: GenerateStockAlertRequest) {
    const product = await this.productsRepository.findById(request.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (!product.isBelowMinimum()) {
      return null;
    }

    const alert = new StockAlert({
      productId: request.productId,
      message: `O produto ${product.props.name} está abaixo do estoque mínimo.`,
      status: 'pending',
      createdAt: new Date(),
    });

    await this.stockAlertsRepository.create(alert);
    return alert;
  }
}
