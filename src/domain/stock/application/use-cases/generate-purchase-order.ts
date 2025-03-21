import { ProductsRepository } from '../repositories/in-memory-products-repository';
import { PurchaseOrder } from '@/domain/stock/enterprise/entities/purchase-order';

export class GeneratePurchaseOrderUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(productId: string) {
    const product = await this.productsRepository.findById(productId);
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    if (product.props.quantity >= product.props.minimumQuantity) {
      return null; // Nenhuma ordem de compra necessária
    }

    const order = new PurchaseOrder({
      productId,
      quantity: product.props.minimumQuantity * 2, // Sugestão: dobrar o mínimo
      status: 'pending',
      createdAt: new Date(),
    });

    return order;
  }
}
