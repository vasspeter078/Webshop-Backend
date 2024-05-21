import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/user-routes.js";
import productRouter from './routes/product-routes.js';
import itemRouter from './routes/item-routes.js';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use("/api/user",  userRouter);
app.use("/api/product", productRouter);
app.use("/api/item", itemRouter);
mongoose.connect("mongodb+srv://admin:ngD9A9rIB2I091md@cluster0.ijtoomh.mongodb.net/Webshop?retryWrites=true&w=majority&appName=Cluster0")
.then(() => app.listen(5000))
.then(() => console.log("connected"))
.catch((err) => console.log(err));
//app.listen(5000);

//ngD9A9rIB2I091md

//mongodb+srv://admin:ngD9A9rIB2I091md@cluster0.ijtoomh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0