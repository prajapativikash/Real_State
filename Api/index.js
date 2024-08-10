import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import UserRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors'
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
   console.log("connected to Db succesfull");
})

   .catch((error) => {
      console.log(error)
   })
const app = express();
app.use(cors())

app.use(express.json());





app.listen(4000, () => {
   console.log("server is running on port 4000")
})

app.use("/Api/user", UserRouter)

app.use('/Api/auth', authRouter);



// this is error Handler using Next() midleware

app.use((error, req, res, next) => {
   const statusCode = error.statusCode || 500;
   const message = error.message || "Internal server error ";
   return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   });
});