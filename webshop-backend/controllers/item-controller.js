import mongoose from "mongoose";
import Item from "../models/Item.js";
import User from "../models/User.js";

export const getAllItems = async (req, res, next) => {
    let items;
    try {
        items = await Item.find();
    } catch (err) {
        console.log(err);
    }
    if (!items) {
        return res.status(404).json({message: "No Items Found"});
    }
    return res.status(200).json({items});
}

export const addItem = async (req, res, next) => {
    const {name, price, image, user} = req.body;
    /*
    let existingUser;
    try {
        existingUser = await Product.findOne({name});
    } catch(err) {
        console.log(err);
    }
    
    if (existingUser) {
        return res.status(400).json({message: "Product Already Exists"});
    }
    */
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch(err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({message: "Unable To Find User"});
    }
    const item = new Item({
        name,
        price,
        image,
        user
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await item.save({session});
        existingUser.cart.push(item);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: err})
    }
    return res.status(201).json({item});
}

/*
export const updateItem = async(req, res, next) => {
    const { name, price, image } = req.body;
    const productId = req.params.id;
    let product;
    try {
        product = await Product.findByIdAndUpdate(productId, {
            name,
            price,
            amount,
            image
        })
    } catch(err) {
        return console.log(err);
    }
    if (!product) {
        return res.status(500).json({message: "Unable To Update Product"});
    }
    return res.status(200).json({product});
}
*/

export const getItemById = async (req, res, next) => {
    const id = req.params.id;
    let item;
    try {
        item = await Item.findById(id);
    } catch(err) {
        return console.log(err);
    }
    if (!item) {
        return res.status(404).json({message: "No Item Found"});
    }
    return res.status(200).json({item});
}

export const deleteItem = async (req, res, next) => {
    const id = req.params.id;
    let item;
    try {
        item = await Item.findByIdAndDelete(id);
    } catch(err) {
        return console.log(err);
    }
    if (!item) {
        return res.status(500).json({message: "No Item Found"});
    }
    return res.status(200).json({message: "Deleted"});
}