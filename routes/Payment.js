const express = require("express");
const PaymentController = require("../controller/Payment")
const auth = require("../authMiddlewaire/auth")

const router = express.Router();


router.post("/", auth(["admin"]), PaymentController.createCoopan);

router.get("/", auth(["admin"]), PaymentController.getCoopan);

module.exports = router;