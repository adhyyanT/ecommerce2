import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../config/connectDB';
import { Cart } from './Cart';

interface ProductModal
  extends Model<
    InferAttributes<ProductModal>,
    InferCreationAttributes<ProductModal>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  title: string;
  desc: string;
  category: string;
  image: string;
  price: number;
}

const Product = sequelize.define<ProductModal>(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(1024),
    },
    category: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true }
);

Product.sync().then(() => {
  Product.hasMany(Cart, { foreignKey: 'product_id' });
});
export { Product };
