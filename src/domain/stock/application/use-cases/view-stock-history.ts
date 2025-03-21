import { SalesRepository } from '../repositories/in-memory-sales-repository';

export class ViewStockHistoryUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute() {
    const sales = await this.salesRepository.items;
    return sales.map(sale => ({
      productId: sale.props.productId,
      quantitySold: sale.props.quantitySold,
      totalPrice: sale.props.totalPrice,
      soldAt: sale.props.soldAt,
    }));
  }
}
