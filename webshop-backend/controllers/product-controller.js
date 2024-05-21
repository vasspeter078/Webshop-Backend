import Product from "../models/Product.js";

/*
import Iphone15 from '../images/iphone15.png';
import SamsungS23 from '../images/samsungs23.png';
import XiaomiRedmiNote12 from '../images/xiaomiredminote12.png';
import SamsungGalaxyA54 from '../images/samsunggalaxya54.png';
import MacBookAir13 from '../images/macbookair13.png';
import ASUSROGStrix17 from '../images/asusrogstrixg17.png';
import DellInspiron3511 from '../images/dellinspiron3511.png';
import AirPods2 from '../images/airpods2.png';
import SonyWH1000XM4 from '../images/sonywh-1000xm4.png';
*/

export const getAllProducts = async (req, res, next) => {
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        console.log(err);
    }
    if (!products) {
        return res.status(404).json({message: "No Products Found"});
    }
    return res.status(200).json({products});
}

export const addProduct = async (req, res, next) => {
    const {name, price, category, amount, image} = req.body;
    let existingUser;
    try {
        existingUser = await Product.findOne({name});
    } catch(err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({message: "Product Already Exists"});
    }
    /*
    switch(image) {
        case "iphone15":
            image = Iphone15;
            break;
        case "samsungs23":
            image = SamsungS23;
            break;
        case "xiaomiredminote12":
            image = XiaomiRedmiNote12;
            break;
        case "samsunggalaxya54":
            image = SamsungGalaxyA54;
            break;
        case "macbookair13":
            image = MacBookAir13;
            break;
        case "asusrogstrixg17":
            image = ASUSROGStrix17;
            break;
        case "dellinspiron3511":
            image = DellInspiron3511;
            break;
        case "airpods2":
            image = AirPods2;
            break;
        case "sonywh-1000xm4":
            image = SonyWH1000XM4;
            break;
    }
    */
    const product = new Product({
        name,
        price,
        category,
        amount,
        image
    });

    try {
        await product.save();
    } catch(err) {
        console.log(err);
    }
    return res.status(201).json({product});
}

export const updateProduct = async(req, res, next) => {
    const { name, price, category, amount, image } = req.body;
    const productId = req.params.id;
    let product;
    try {
        product = await Product.findByIdAndUpdate(productId, {
            name,
            price,
            category,
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

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findById(id);
    } catch(err) {
        return console.log(err);
    }
    if (!product) {
        return res.status(404).json({message: "No Product Found"});
    }
    return res.status(200).json({product});
}

export const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findByIdAndDelete(id);
    } catch(err) {
        return console.log(err);
    }
    if (!product) {
        return res.status(500).json({message: "No Product Found"});
    }
    return res.status(200).json({message: "Deleted"});
}

export const getByName = async (req, res, next) => {
    let allProducts;
    try {
        allProducts = await Product.find();
    } catch (err) {
        console.log(err);
    }
    if (!allProducts) {
        return res.status(404).json({message: "No Products Found"});
    }
    let products = allProducts.filter((product) => {
        return product.name.toLowerCase().includes(req.params.name.toLowerCase());
    });
    return res.status(200).json({products});
}

export const getByCategory = async(req, res, next) => {
    let allProducts;
    try {
        allProducts = await Product.find();
    } catch (err) {
        console.log(err);
    }
    if (!allProducts) {
        return res.status(404).json({message: "No Products Found"});
    }
    let products = allProducts.filter((product) => {
        return product.category.includes(req.params.category);
    });
    return res.status(200).json({products});
}