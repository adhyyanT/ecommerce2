import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', async (req, res) => {});

app.listen(process.env.PORT, () => {
  console.log(`server started on port = ${process.env.PORT}`);
});
