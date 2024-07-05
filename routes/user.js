const express=require("express");
const authMiddleawire=require('../authMiddlewaire/auth')
const userController=require("../controller/user")

const router=express.Router();


router.post("/register", userController.userRgistration);

router.post("/login",userController.userLogin);

router.post("/logout",userController.userLogout);

router.post("/reset-password",userController.resetPassword)

router.post("/forget-password",userController.forgetPassword)

router.get("/getuserID",userController.getUserID)


router.post("/address",authMiddleawire(["admin"]),userController.saveAddress);

module.exports=router;