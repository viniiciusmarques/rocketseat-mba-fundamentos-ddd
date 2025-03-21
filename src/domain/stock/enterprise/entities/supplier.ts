import { Entity } from '@/core/entities/entity';

export interface SupplierProps {
  name: string;
  contact: string;
}

export class Supplier extends Entity<SupplierProps> {
  constructor(props: SupplierProps, id?: string) {
    super(props, id);
  }
}
