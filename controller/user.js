const userModal = require("../modal/user")
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");


const userRgistration = async (req, res) => {
    const pass = req.body.password
    const encrptrdPass=bcrypt    

    try {
        const newUser = new userModal(req.body)
        await newUser.save();
        res.json({
            success: true,
            massage: "User Sucessfully Resistered, Login now!"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.message
        });
    }

};

const userLogin = async (req, res) => {
    // console.log(req.body);
    try {
        const user = await userModal.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
   
        // this is for check the data encrptrd password

        // const isPasswordCorrect = bcrypt.compareSync(
        //     req.body.password,
        //     user.password
        // );
      
        if (req.body.password === user.password) {
            const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 7200;
            const payload = {
                id: user._id,
                name: user.firstname,
                role: user.role,
                exp: expiryDateTime,
            };
            // to generate toaken add payload and jwt secrate key
            const barearToken = jwt.sign(payload, process.env.JWT_SECRET_KEY)
            res.json({
                success: true,
                massage: "Login Sucessfully!",
                token: barearToken
            })

        } else {
            res.status(401).json({
                success: false,
                massage: "Invalid Credencials!"
            })
        }
    } catch (error) {
        res.status(401).json({ massage: error.message });
    }


};

const userLogout = async (req, res) => {
    try {
        if (req.cookies.refreshToken) {
            res.clearCookie("refreshToken");
            
            res.json({
                success: true,
                massage: "User Logout Sucessfully !"
            });
        }
    } catch (error) {
        res.json({
            success: false,
            massage: "Unable to logout Session !"
        });
    }

}

const saveAddress = async (req, res) => {
    try {
        const setObject = {};
        const address = req.body;

        if (address.address) {
            setObject["address.address"] = address.address;
        }

        if (address.city) {
            setObject["address.city"] = address.city;
        }

        if (address.state) {
            setObject["address.state"] = address.state;
        }

        if (address.pincode) {
            setObject["address.pincode"] = address.pincode;
        }

        const updateObject = {
            $set: setObject
        }

        console.log(req.query.userid);
        const updateResult = await userModal.findByIdAndUpdate(
            req.query.userid,
            updateObject
        )

        res.json({
            success: true,
            massage: "Sucessfully updated address !",
            response: updateResult
        })

    } catch (error) {
        res.status(404).json(
            {
                success: false,
                massage: "Forbidden"
            }
        )
    }
}
const resetPassword = async (req, res) => {

    try {
        const updatePass = {
            $set: {
                password: req.body.password
            }
        }


        const resetPass = await userModal.findByIdAndUpdate(
            req.query.userid,
            updatePass

        )
        console.log(resetPass);

        res.json({
            success: true,
            massage: "Password reset sucessfully !"
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: "Error to reset password"
        })
    }
}

// forget PASS
// 1. send email a 6 degit code
// 2. same make a jwt token
// 3. match with otp in jwt token by jwt
// 4. then able to update data
const forgetPassword = async (req, res) => {

    try {
        const query = {
            $and: [
                { username: req.body.username },
                { email: req.body.email }

            ]
        }

        const userDetails = await userModal.find(
            query
        )
        console.log(userDetails);

        res.json({
            success: true,
            massage: "Password reset sucessfully !"
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: "Error to reset password"
        })
    }
}

const getUserID = async (req, res) => {

    try {
        console.log(req.body);
        const query = {
            $and: [
                { firstname: req.body.firstname },
                { email: req.body.email },
                { role: req.body.role }

            ]
        }


        const userDetails = await userModal.find(
            query, {
            _id: 1
        }
        )

        console.log(userDetails);
        res.json({
            success: true,
            massage: "Get user-ID By user Details !",
            userid: userDetails
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: "Error to reset password"
        })
    }
}
const userController = {
    userRgistration,
    userLogin,
    userLogout,
    saveAddress,
    resetPassword,
    forgetPassword,
    getUserID,
}

module.exports = userController;
