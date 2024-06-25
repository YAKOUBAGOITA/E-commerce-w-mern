const userModel=require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
 // Make sure this path is correct

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
           const tokenData={
            _id:user._id,
            email:user.email,
            }
           const token=await jwt.sign({tokenData: 'foobar' }, 'process.env.TOKEN_SECERT_KEY', { expiresIn: 60 * 60*8 });

          const tokenOption={
            httpOnly:true,
            secure:true,
          }
           res.cookie('token', token,tokenOption).status(200).json({
            message:"login successfully",
            data:token,
            success:true,
            error:false
           })
            
        }else{
            throw new Error("Please check password");
        }

        res.json({
            message: "Sign-in successful",
            error: false,
            success: true,
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;