const mongoose = require("mongoose");

const cardProduct = new mongoose.Schema({

    productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
    },
    color: {
        type: String,
    },
    price: {
        type: Number
    }

})


const cartSchema = new mongoose.Schema({

    products: {
        type: [cardProduct],
    },



})

const deliveryAddress = new mongoose.Schema({
    address: {
        type: String,
        require: false,
        default: ""
    },
    city: {
        type: String,
        require: false,
        default: ""
    },
    state: {
        type: String,
        require: false,
        default: ""
    },
    pincode: {
        type: String,
        require: false,
        default: ""
    },
})

const orderSchema = new mongoose.Schema({
    cart: {
        type: cartSchema,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    Amount: {
        type: Number,
        required: true,
    },
    coupan: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        default: null
    },
    deliveryAddress: {
        type: deliveryAddress,
        required: true
    },
    orderPlacedAt: {
        type: Date,
        required: true,

    },
    orderStatus: {
        type: String,
        required: true,
        default: false
    },
    modeOfPayment: {
        type: String,
        required: true,
    },
     transationID: {
        type: String,
        required: true,
         default:""
    }
})

const OrderModal = mongoose.model("order", orderSchema)
module.exports = OrderModal;