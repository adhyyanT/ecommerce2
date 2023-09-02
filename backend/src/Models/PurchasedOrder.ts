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
import { PurchasedItem } from './PurchasedItem';

@Entity()
export class PurchasedOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  orderId!: number;

  @Column()
  userId!: number;

  @ManyToOne((type) => User, (user) => user.id)
  user!: User;

  @OneToMany((type) => PurchasedItem, (item) => item.puchaseId)
  items!: PurchasedItem[];
}
