const express = require("express");
const cartController = require("../controller/cart")
const auth = require("../authMiddlewaire/auth")

const router = express.Router();


router.post("/", cartController.createCart);

router.get("/", cartController.getCart);

router.get("/:id", cartController.getCartByID);

router.delete("/:id", cartController.removeCartProductByID);

router.patch("/", cartController.updateCart);

module.exports = router;