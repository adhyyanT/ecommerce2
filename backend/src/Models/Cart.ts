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
import 'reflect-metadata';
@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  cart_id!: number;

  @Column()
  user_id!: number;

  @Column()
  product_id!: number;

  @ManyToOne((type) => User, (user) => user.orders, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne((type) => Product, (product) => product.orders, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product!: Product;
}
