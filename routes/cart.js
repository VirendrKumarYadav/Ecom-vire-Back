const express = require("express");
const cartController = require("../controller/cart")
const auth=require("../authMiddlewaire/auth")

const router = express.Router();


router.post("/",auth(["admin"]), cartController.createCart);

router.get("/", auth(["admin"]),cartController.getCart);

module.exports = router;