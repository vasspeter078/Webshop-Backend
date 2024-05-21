import express from 'express';
import { getAllProducts, addProduct, updateProduct, getById, deleteProduct, getByName, getByCategory } from '../controllers/product-controller.js';

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/add", addProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.get("/:id", getById);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/filter-by-name/:name", getByName);
productRouter.get("/filter-by-category/:category", getByCategory);

export default productRouter;