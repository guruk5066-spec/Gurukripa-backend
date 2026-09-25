const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                message: "Enter email password & username"
            })
        }
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(401).json({
                message: "User already exists"
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const data = new User({
            email: email,
            password: hashedpassword,
            username: username
        });
        const response = await data.save();
        return res.status(201).json({
            message: "User Created",
            response: response
        })
    }
    catch (ex) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Enter email password"
            })
        }
        const existinguser = await User.findOne({ email });
        if (!existinguser) {
            return res.status(401).json({
                message: "User not exists"
            })
        }
        const isMatch = await bcrypt.compare(password, existinguser.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Password does not match"
            })
        }
        const token=jwt.sign({
            id:existinguser._id
        },'ihesfhsefhseihdshekchsuhrfkshkhkhkkrsjclksijfl',{expiresIn:'90d'});
        return res.status(200).json({
            message:"Login Success",
            response:existinguser,
            token:token
        })

    }
    catch (ex) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}