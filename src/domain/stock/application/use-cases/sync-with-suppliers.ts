import { Supplier } from '@/domain/stock/enterprise/entities/supplier';

export class SyncWithSuppliersUseCase {
  async execute(suppliers: Supplier[]) {
    return suppliers.map(supplier => ({
      supplierId: supplier.id,
      name: supplier.props.name,
      status: 'Updated',
      lastSync: new Date(),
    }));
  }
}
