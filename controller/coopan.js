const { response } = require("express");
const CoopanModal = require("../modal/coopan");
const CouponModel = require("../modal/coopan");


const getCoopan = async(req, res) => {

    try {

   const coupan =await CouponModel.find();

        res.json({
            sucess: true,
            massage: "get the Coopan",
            coupan:coupan
        })
    } catch (err) {
        res.statue(400).json({
            sucess: false,
            massage: "Failed to get the Coopan"
        })
    }

}
const createCoopan = async (req, res) => {

    try {
        console.log(req.body);
        await CoopanModal.create(req.body);
        res.json({
            success: true,
            message: "Coupon created scucessfully",

        });
    } catch (err) {

        res.status(400).json({
            sucess: false,
            massage: "Failed Create the Coupan"
        })
    }

}

module.exports = {
    getCoopan,
    createCoopan
}