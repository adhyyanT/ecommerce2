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
import 'reflect-metadata';
@Entity()
export class PurchasedItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  puchase_id!: number;

  @Column()
  purchase_order_id!: number;

  @Column()
  item_id!: number;

  @Column()
  count!: number;

  @ManyToOne((type) => PurchasedOrder, (purchase) => purchase.order_id)
  @JoinColumn({ name: 'purchase_order_id' })
  purchase!: PurchasedOrder;
}
