import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';
import { PurchasedOrder } from './PurchasedOrder';

@Entity()
export class PurchasedItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  puchaseId!: number;

  @Column()
  purchaseOrderId!: number;

  @ManyToOne((type) => PurchasedOrder, (purchase) => purchase.orderId)
  purchase!: PurchasedOrder;
}
