const express = require("express");
const CartController = require("../controller/coopan")
const auth = require("../authMiddlewaire/auth")

const router = express.Router();

router.get("/",auth(["admin"]),CartController.getCoopan);
router.post("/",auth(["admin"]),CartController.createCoopan);



module.exports = router;