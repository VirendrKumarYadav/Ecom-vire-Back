const productModal = require("../modal/products")
const jwt = require("jsonwebtoken")

const createProduct = async (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        const payload = jwt.decode(req.headers.authorization);
        if (payload.role === "admin") {
            const productID = new productModal(req.body)
            await productID.save();

            res.json({
                sucess: true,
                massage: "Product Ctrated Sucessfully!",
                ProductID: productID._id
            })
        }
    } catch (err) {
        console.log(err);
    }
}
const getProduct = async (req, res) => {
    // jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
    try {
        // const payload = jwt.decode(req.headers.authorization);
        // if (payload.role === "admin") {
        const productDetails = await productModal.findOne(
            {
                _id: {
                    $eq: req.params.id,
                },
            }
        )

        res.json({
            data: productDetails,
            sucess: true,
            massage: req.params.id
        })
    }
     catch (err) {
    res.json({
        sucess: false,
        massage: err
    })
    console.log(err.massage);
}

}
const getProductList = async (req, res) => {
    // jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
    const productList = await productModal.find();
    try {
        // const payload = jwt.decode(req.headers.authorization);
        // if (payload.role === "admin") {
        res.json(productList)
        // }
    } catch (err) {
        res.json({
            sucess: false,
            massage: err.massage
        })

    }

}

const updateOneJobs = async (req, res) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
    try {
        const payload = jwt.decode(req.headers.authorization);
        if (payload.role === "admin") {
            const Jobs = await JobModal.updateOne(
                {
                    id: {
                        $eq: req.params.id,
                    },
                },
                { $set: req.body }
            );
            res.json(Jobs);

        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const reviewProduct = async (req, res) => {

    try {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        console.log(req.body);
        const payload = jwt.decode(req.headers.authorization);
        if (payload.role === "admin") {
            console.log(req.headers.productId, req.body, req.user._id);

            const updateObject = {
                $push: {
                    reviews: {
                        rating: req.body.rating,
                        comments: req.body.comments,
                        userid: req.user._id
                    },
                }
            }

            productModal.findByIdAndUpdate(req.params.productid, req.body)
            res.json({
                sucess: true,
                massage: "sucessfully added to review"
            })
        }
    } catch (error) {
        res.json({
            sucess: false,
            massage: error.massage
        })
    }
}
// like and deslike product
const actionLikeDislike = async (req, res) => {
    // console.log(req.params);
    try {
        let updateObject = {
            $push:
                { "like": req.body.userID },
            $pull:
                { "dislike": req.body.userID },
            $inc: {
                likesCount: 1
            }

        };

        if (req.params.action == "dislike") {
            updateObject = {
                $push:
                    { "dislike": req.body.userID },
                $pull:
                    { "like": req.body.userID },
                $dec: {
                    likesCount: 1
                }

            }
        }
        const updatedProduct = await productModal.findByIdAndUpdate(req.params.productID,
            updateObject
        )

        res.json({
            sucess: true,
            massage: req.params.action + " Product Sucessfully!"
        })

    } catch (error) {
        res.json({
            sucess: false,
            error: error
        })
    }

}
// In the below case we are adding one new concep to population data of one collaction to other
const getProductDetailsByID = async (req, res) => {
    // console.log(req.query);
    try {
        const details = await productModal.findById(req.query.productID).populate("like").populate("dislike")
        // console.log([...details]);
        function isName(fruit) {
            return fruit.name === "firstname";
        }
        res.json({
            sucess: true,
            massage: "Product by ID Called",
            productDetails: details.like
        })

    } catch (error) {
        res.json(error)
    }
}
const getProductReview = async (req, res) => {
    const product = await productModal.find({ _id: req.params.productID })
}

const productController = {
    createProduct,
    getProduct,
    getProductList,
    updateOneJobs,
    reviewProduct,
    actionLikeDislike,
    getProductDetailsByID,
    getProductReview
}


module.exports = productController