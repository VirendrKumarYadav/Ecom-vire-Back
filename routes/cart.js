const express = require("express");
const cartController = require("../controller/cart")
const auth = require("../authMiddlewaire/auth")

const router = express.Router();


router.post("/", cartController.createCart);

router.get("/", cartController.getCart);

router.delete("/:id", cartController.deleteCart);


module.exports = router;