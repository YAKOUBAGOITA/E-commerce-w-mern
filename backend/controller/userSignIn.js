const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Changed to return response immediately
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false,
            });
        }
        
        // Changed to return response immediately
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false,
            });
        }

        const user = await userModel.findOne({ email });
        
        // Changed to return response immediately
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        
        // Changed to return response immediately if password does not match
        if (!checkPassword) {
            return res.status(401).json({
                message: "Please check password",
                error: true,
                success: false,
            });
        }

        const tokenData = {
            _id: user._id,
            email: user.email,
        };
        
        // Fixed usage of environment variable
        const token = await jwt.sign({ tokenData }, process.env.TOKEN_SECERT_KEY, { expiresIn: '8h' });

        const tokenOption = {
            httpOnly: true,
            secure: true,
        };

        // Changed to return response immediately and removed redundant response below
        return res.cookie('token', token, tokenOption).status(200).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false,
        });

    } catch (err) {
        // Changed to return response immediately
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;