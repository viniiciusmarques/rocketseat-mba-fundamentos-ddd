import { Entity } from '@/core/entities/entity';

export interface ProductProps {
  name: string;
  description: string;
  quantity: number;
  minimumQuantity: number;
  size?: string;
  color?: string;
  price: number;
  createdAt: Date;
}

export class Product extends Entity<ProductProps> {
  constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  decreaseQuantity(amount: number) {
    if (this.props.quantity - amount < 0) {
      throw new Error('Insufficient stock');
    }
    this.props.quantity -= amount;
  }

  increaseQuantity(amount: number) {
    this.props.quantity += amount;
  }

  isBelowMinimum(): boolean {
    return this.props.quantity <= this.props.minimumQuantity;
  }
}
