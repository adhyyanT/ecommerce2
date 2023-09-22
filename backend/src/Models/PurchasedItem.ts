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
// } from 'typeorm';
// import { User } from './User';
// import { Product } from './Product';
// import { PurchasedOrder } from './PurchasedOrder';
// import 'reflect-metadata';
// @Entity()
// export class PurchasedItem extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   puchase_id!: number;

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../config/connectDB';
import { PurchaseOrder } from './PurchasedOrder';

//   @Column()
//   purchase_order_id!: number;

//   @Column()
//   item_id!: number;

//   @Column()
//   count!: number;

//   @ManyToOne((type) => PurchasedOrder, (purchase) => purchase.order_id)
//   @JoinColumn({ name: 'purchase_order_id' })
//   purchase!: PurchasedOrder;
// }

interface PurchaseItemModel
  extends Model<
    InferAttributes<PurchaseItemModel>,
    InferCreationAttributes<PurchaseItemModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  purchase_order_id: number;
  item_id: number;
  count: number;
}
const PurchasedItem = sequelize.define<PurchaseItemModel>(
  'purchase_item',
  {
    purchase_order_id: {
      type: DataTypes.INTEGER,
      // primaryKey:true,
      // autoIncrement:true
      references: {
        model: 'purchase_order',
        key: 'order_id',
      },
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

PurchasedItem.sync({ alter: true }).then(() => {
  PurchasedItem.belongsTo(PurchaseOrder, {
    foreignKey: 'purchase_order_id',
  });
});

export { PurchasedItem };
