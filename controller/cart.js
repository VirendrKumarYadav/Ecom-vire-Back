const cartModal = require("../modal/cart");
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
            data:cartList
        })

    } catch (err) {
        res.status(404).json({
            sucess: false,
            massage: err
        })

    }

}

const getCartByID = async (req, res) => {
    try {
        const cartList = await CartModal.findOne({_id:req.params.id})

        res.status(200).json({
            data:cartList
        })

    } catch (err) {
        res.status(404).json({
            sucess: false,
            massage: err
        })

    }

}


const updateCart = async (req, res) => {
    try {
        const cartID = req.query.cartid;
        const product = req.body;

        // Find the cart by ID
        const cart = await CartModal.findById(cartID);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        let products = cart.products;
        let existingProduct = products.find((item) => item.productID.toString() === product.productID.toString());

        if (existingProduct) {
            // Update the quantity of the existing product
            existingProduct.quantity += 1;
        } else {
            // Add the new product to the cart
            products.push(product);
        }

     
        cart.products = products;
        await cart.save();

        // Update the total price of the cart
        updateTotalPriceOfCart(cartID);

        const updatedCart = await CartModal.findById(cartID);

        res.json({
            success: true,
            message: "Cart item updated successfully",
            cart: updatedCart
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


const updateTotalPriceOfCart = async (cartID) => {
    let cartTotal = 0;
    cart = await cartModal.findById(cartID);
    let { products } = cart;


    for (let i = 0; i < products.length; i++) {
        const crtProduct = products[i];

        const { price } = await ProducModal.findById(crtProduct.productID, {
            price: 1,
            _id: 0
        });

        cartTotal += crtProduct.quantity * price;

    }
    console.log(cartTotal);

    cart.cartTotal = cartTotal;

    await cart.save();
}

const removeCartProductByID = async (req, res) => {
    try {
        let cart = await cartModal.findById(req.query.cartID);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        let { products } = cart;
        const id = req.params.id;

        // Debug logging
        // console.log(`Cart ID: ${req.query.cartID}`);
        // console.log(`Product ID to remove: ${id}`);
        // console.log(`Original products:`, products);

        // Filter out the product with the matching ID
        let filteredArray = [];
        filteredArray = products.filter((item, idx) => products[idx].productID.toString() !== id.toString());

        // Debug logging
        console.log(`Filtered products:`, filteredArray);

        // Update the products array and save the cart
        cart.products = filteredArray;

        // Save the updated cart
        await cart.save();

        updateTotalPriceOfCart(req.query.cartID);



        res.json({
            success: true,
            message: "Cart Item Deleted Successfully",
            cart,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            massage: err.stack,
        });
    }
};


const cartController = {
    getCartByID,
    getCart,
    createCart,
    updateCart,
    removeCartProductByID
}


module.exports = cartController