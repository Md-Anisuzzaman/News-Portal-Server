const userModel = require("../Model/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const securePass = await bcrypt.hash(password, 10);

        let newUser = await new userModel({
            username,
            email,
            password: securePass

        }).save();

        let token = jwt.sign({
            username,
            email,
            _id: newUser._id
        }, "please_beaware")

        const user = await user.findOne({ email: email });

        if (user) {
            res.status(400).json({ message: 'User already exists' });
        }
        else {
            res.status(201).json({
                newUser,
                token,
            });
        }

    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}

module.exports = {
    registerUser
};