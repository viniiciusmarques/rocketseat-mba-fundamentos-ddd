import { StockAlert } from '@/domain/stock/enterprise/entities/stock-alert';

export class InMemoryStockAlertsRepository {
  public items: StockAlert[] = [];

  async create(alert: StockAlert) {
    this.items.push(alert);
  }
}
