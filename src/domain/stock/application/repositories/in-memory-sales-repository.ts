import { Sale } from '@/domain/stock/enterprise/entities/sale';

export class InMemorySalesRepository {
  public items: Sale[] = [];

  async create(sale: Sale) {
    this.items.push(sale);
  }
}
