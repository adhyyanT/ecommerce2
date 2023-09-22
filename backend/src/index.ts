import app from './app';
import dotenv from 'dotenv';
dotenv.config();
app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port = ${process.env.PORT}`);
});
