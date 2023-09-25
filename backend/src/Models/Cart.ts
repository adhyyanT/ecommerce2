import { sequelize } from '../config/connectDB';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { User } from './User';
import { Product } from './Product';

interface CartModel
  extends Model<
    InferAttributes<CartModel>,
    InferCreationAttributes<CartModel>
  > {
  cart_id: CreationOptional<number>;
  user_id: number;
  product_id: number;
}
const Cart = sequelize.define<CartModel>(
  'cart',
  {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
  },
  { freezeTableName: true }
);

Cart.sync().then(() => {
  Cart.belongsTo(User, {
    foreignKey: 'user_id',
  });
  Cart.belongsTo(Product, {
    foreignKey: 'product_id',
  });
});

export { Cart };
