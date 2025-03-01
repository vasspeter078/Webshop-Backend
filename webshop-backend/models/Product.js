import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        requires: true
    },
    amount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

export default mongoose.model("Product", productSchema);