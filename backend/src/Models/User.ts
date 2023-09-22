// import 'reflect-metadata';
// import {
//   BaseEntity,
//   Column,
//   CreateDateColumn,
//   Entity,
//   PrimaryGeneratedColumn,
//   ManyToMany,
//   OneToMany,
// } from 'typeorm';
// import { Cart } from './Cart';
// import { PurchasedOrder } from './PurchasedOrder';

// @Entity()
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({
//     nullable: false,
//   })
//   name!: string;

//   @Column({
//     unique: true,
//     nullable: false,
//   })
//   email!: string;

//   @Column({
//     unique: true,
//     nullable: false,
//   })
//   username!: string;

//   @Column({
//     nullable: false,
//   })
//   password!: string;

//   @CreateDateColumn()
//   createdAt!: Date;

//   @OneToMany((type) => Cart, (cart) => cart.cart_id)
//   orders!: Cart[];

//   @OneToMany((type) => PurchasedOrder, (order) => order.order_id)
//   purchaseOrders!: PurchasedOrder[];
// }

import { sequelize } from '../config/connectDB';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { Cart } from './Cart';

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  username: string;
}

const User = sequelize.define<UserModel>(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

User.sync({ alter: true }).then(() => {
  User.hasMany(Cart, {
    foreignKey: 'user_id',
  });
  //   User.
});
export { User };
