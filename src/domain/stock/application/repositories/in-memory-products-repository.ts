import { Product } from '@/domain/stock/enterprise/entities/product';

export class InMemoryProductsRepository {
  public items: Product[] = [];

  async create(product: Product) {
    this.items.push(product);
  }

  async update(product: Product) {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.items[index] = product;
    }
  }

  async findById(id: string) {
    return this.items.find(item => item.id === id) || null;
  }
}
