
const CoopanModal = require("../modal/Payment");
const Rozorpay = require("razorpay");

const getCoopan = (req, res) => {



    try {
        if (true) {
            const razorpay = new Rozorpay({
                key_id: "rzp_test_JVLDfLKKcH5jAw",
                key_secret: "eWR6YUciSXo49kGYm60Nk6fT"
            }
            )
        }



        res.json({
            sucess: true,
            massage: "get the Coopan"
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