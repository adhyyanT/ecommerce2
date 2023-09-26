import app from './app';
import dotenv from 'dotenv';
dotenv.config();
const port = parseInt(process.env.PORT!) || 3000;
app.listen(port, () => {
  console.log(`server started on port = ${port}`);
});
