import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Cart } from './Cart';

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

  @OneToMany((type) => Cart, (cart) => cart.cartId)
  orders!: Cart[];
}
