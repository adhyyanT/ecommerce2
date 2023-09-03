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
  order_id!: number;

  @Column()
  user_id!: number;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany((type) => PurchasedItem, (item) => item.puchase_id)
  items!: PurchasedItem[];
}
