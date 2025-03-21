import { Entity } from '@/core/entities/entity';

export interface PurchaseOrderProps {
  productId: string;
  quantity: number;
  status: 'pending' | 'approved' | 'completed';
  createdAt: Date;
}

export class PurchaseOrder extends Entity<PurchaseOrderProps> {
  constructor(props: PurchaseOrderProps, id?: string) {
    super(props, id);
  }
}
