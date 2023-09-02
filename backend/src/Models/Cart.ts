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

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  cartId!: number;

  @Column()
  userId!: number;

  @Column()
  productId!: number;

  @ManyToOne((type) => User, (user) => user.orders, { eager: true })
  @JoinColumn()
  user!: User;

  @ManyToOne((type) => Product, (product) => product.orders, { eager: true })
  @JoinColumn()
  product!: Product;
}
