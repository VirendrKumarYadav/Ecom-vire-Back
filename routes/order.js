const express = require("express");
const router =express.Router();
const orderControler=require("../controller/Order")


router.get("/",orderControler.getOrder);
router.post("/",orderControler.createOrder);
router.post("/create-order",orderControler.createOrderByRazorpay)
router.get("/order-all/:email",orderControler.getOrdersFromRazorPay)


module.exports=router




