import 'reflect-metadata';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Cart } from './Cart';
import { PurchasedOrder } from './PurchasedOrder';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  name!: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username!: string;

  @Column({
    nullable: false,
  })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany((type) => Cart, (cart) => cart.cart_id)
  orders!: Cart[];

  @OneToMany((type) => PurchasedOrder, (order) => order.order_id)
  purchaseOrders!: PurchasedOrder[];
}
