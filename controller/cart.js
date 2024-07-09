const CartModal = require("../modal/cart");
const ProducModal = require("../modal/products");

const createCart = async (req, res) => {
    try {
        // console.log(req.body.products);
        // const userCart = await CartModal.findOne({ userID: req.user._id })
        if (false) {

        } else {
            let cartTotal = 0;
            const productToAdd = [];
            for (let i = 0; i < req.body.products.length; i++) {
                const crtProduct = req.body.products[i];
               
                const { price } = await ProducModal.findById(crtProduct.productID, {
                    price: 1,
                    _id: 0
                })
             
                const products = {
                    ...crtProduct,
                    price,
                }


                cartTotal += crtProduct.quantity * price;
                productToAdd.push(products);
                console.log(cartTotal); 


            }
             CartModal.create({
                products: productToAdd,
                userID: req.body.userID,
                cartTotal: cartTotal
            })

            console.log(cartTotal); 

        }
        res.json({
            sucess: true,
            massage: "Cart Created Sucessfully !"
        })

    } catch (err) {
        res.status(404).json({
            sucess: false,
            massage: "Forbidden"
        })

    }

}
const getCart = async (req, res) => {
    try {
        const cartList = await CartModal.find({})

        res.json({
            cartList
        })

    } catch (err) {
        res.status(404).json({
            sucess: false,
            massage: err
        })

    }

}
const deleteCart = async (req, res) => {

    try {
        const cartList = await CartModal.findOneAndDelete({ __id: req.params.id})

        res.json({
            sucess: true,
            massage: "Cart Item Deleted Sucessfully",
            cartList
        })

    } catch (err) {
        res.status(404).json({
            sucess: false,
            massage: err
        })

    }

}

const cartController = {
    getCart,
    createCart,
    deleteCart
}


module.exports = cartController