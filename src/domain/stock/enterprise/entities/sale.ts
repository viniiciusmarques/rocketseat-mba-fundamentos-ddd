import { Entity } from '@/core/entities/entity';

export interface SaleProps {
  productId: string;
  quantitySold: number;
  totalPrice: number;
  soldAt: Date;
}

export class Sale extends Entity<SaleProps> {
  constructor(props: SaleProps, id?: string) {
    super(props, id);
  }
}
