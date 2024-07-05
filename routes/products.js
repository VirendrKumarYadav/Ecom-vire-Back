const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/products")
const authMiddlewaire=require("../authMiddlewaire/auth")


productRouter.post("/product", productController.createProduct);

productRouter.get("/product/:id", productController.getProduct);

productRouter.get("/products", productController.getProductList);

productRouter.put("/update", productController.getProductList);
// router.get("/update")
// like 
productRouter.post("/product/:action/:productID",authMiddlewaire(["admin"]), productController.actionLikeDislike);

productRouter.post("/product-by-id", productController.getProductDetailsByID);

productRouter.get("product/review", productController.getProductReview);
// productRouter.post("/product/:productid/review",productController.reviewProduct);

module.exports = productRouter;