const express = require("express");
const router =express.Router();
const orderControler=require("../controller/Order")


router.get("/",orderControler.getOrder);
router.post("/",orderControler.createOrder);

module.exports=router




