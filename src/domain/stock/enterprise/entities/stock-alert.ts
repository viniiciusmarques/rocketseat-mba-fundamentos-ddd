import { Entity } from '@/core/entities/entity';

export interface StockAlertProps {
  productId: string;
  message: string;
  status: 'pending' | 'resolved';
  createdAt: Date;
}

export class StockAlert extends Entity<StockAlertProps> {
  constructor(props: StockAlertProps, id?: string) {
    super(props, id);
  }
}
