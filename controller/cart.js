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


            }
               CartModal.create({
                products:productToAdd,
                cartTotal:cartTotal,
                userID:req.user._id
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
        const productCartList=await ProducModal.find({})
        console.log(productCartList);
        res.json({
          productCartList
        })

    } catch (err) {
        res.json({
            sucess: false,
            massage: err
        })

    }

}

const cartController = {
    getCart,
    createCart
}


module.exports = cartController