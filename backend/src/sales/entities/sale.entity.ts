import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('jsonb')
  items: {
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
  }[];

  @Column('decimal')
  totalAmount: number;
}
