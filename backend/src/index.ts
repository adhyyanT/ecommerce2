import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { AppDataSource } from './config/connectDB';
import { User } from './Models/User';
import { Product } from './Models/Product';
import { Cart } from './Models/Cart';

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('combined'));

app.get('/', async (req, res) => {
  try {
    //   const user = new User();
    //   user.name = 'test';
    //   user.email = 'test@example.com';
    //   user.username = 'root';
    //   user.password = 'root';
    const userRepo = AppDataSource.getRepository(User);
    //   userRepo.save(user);

    const productRepo = AppDataSource.getRepository(Product);
    //   const product = new Product();
    //   product.category = 'test';
    //   product.desc = 'bgweu';
    //   product.price = 2414;
    //   product.title = '235';
    //   productRepo.save(product);
    const product = await productRepo.findOne({
      where: {
        id: 5,
      },
    });
    const user = await userRepo.findOne({
      where: {
        id: 8,
      },
    });
    const cartRepo = AppDataSource.getRepository(Cart);
    const ans = await cartRepo
      .createQueryBuilder('carts')

      .where('carts.userId = :id', { id: user!.id })
      .getMany();
    res.status(200).json(ans);
    //   const u = await User.findOneBy({ id: 1 });

    //   AppDataSource.manager.save(user);
    //   await AppDataSource.manager.remove(u);
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port = ${process.env.PORT}`);
});
