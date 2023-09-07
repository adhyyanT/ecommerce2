import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Cart } from './Cart';
import 'reflect-metadata';
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  desc!: string;

  @Column()
  category!: string;

  @Column({
    nullable: true,
  })
  image!: string;

  @Column()
  price!: number;

  @OneToMany((type) => Cart, (cart) => cart.cart_id)
  orders!: Cart[];
}
