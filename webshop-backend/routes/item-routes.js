import express from 'express';
import { getAllItems, addItem, getItemById, deleteItem } from '../controllers/item-controller.js';

const itemRouter = express.Router();

itemRouter.get("/", getAllItems);
itemRouter.post("/add", addItem);
//itemRouter.put("/update/:id", updateItem);
itemRouter.get("/:id", getItemById);
itemRouter.delete("/:id", deleteItem);

export default itemRouter;