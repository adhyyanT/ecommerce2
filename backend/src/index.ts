import app from './app';
import { AppDataSource } from './config/connectDB';
app.listen(process.env.PORT, () => {
  console.log(`server started on port = ${process.env.PORT}`);
});
