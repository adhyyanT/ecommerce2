// import 'reflect-metadata';
// import {
//   BaseEntity,
//   Column,
//   CreateDateColumn,
//   Entity,
//   PrimaryColumn,
//   PrimaryGeneratedColumn,
//   OneToMany,
//   ManyToMany,
//   ManyToOne,
//   JoinColumn,
//   Generated,
// } from 'typeorm';
// import { User } from './User';
// import { Product } from './Product';
// import { PurchasedItem } from './PurchasedItem';

// @Entity()
// export class PurchasedOrder extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   order_id!: number;

//   @Column()
//   user_id!: number;

//   @CreateDateColumn()
//   createdAt!: Date;

//   @ManyToOne((type) => User, (user) => user.id)
//   @JoinColumn({ name: 'user_id' })
//   user!: User;

//   @OneToMany((type) => PurchasedItem, (item) => item.puchase_id)
//   items!: PurchasedItem[];
// }
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../config/connectDB';
import { PurchasedItem } from './PurchasedItem';

interface PurchaseOrderModel
  extends Model<
    InferAttributes<PurchaseOrderModel>,
    InferCreationAttributes<PurchaseOrderModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  order_id: CreationOptional<number>;
  user_id: number;
}
const PurchaseOrder = sequelize.define<PurchaseOrderModel>(
  'purchase_order',
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  { freezeTableName: true }
);

PurchaseOrder.sync({ alter: true }).then(() => {
  PurchaseOrder.hasMany(PurchasedItem, {
    foreignKey: 'purchase_order_id',
  });
});

export { PurchaseOrder };
