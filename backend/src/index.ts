import app from './app';
// import { AppDataSource } from './config/connectDB';
app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port = ${process.env.PORT}`);
});
