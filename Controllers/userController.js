const ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');
const { uploadFile } = require('./imageUploadControler');

const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const { username, email, password } = req.body;
    const securePass = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        username,
        email,
        password: securePass,
        role: "user"
    })

    const user = await userModel.findOne({ email: email })

    if (!user) {
        const result = await newUser.save();
        console.log(newUser);

        const token = await jwt.sign({
            username,
            email,
            _id: newUser._id
        }, "sabdhan__hack_korbina", { expiresIn: "1d" })

        res.status(200).json({
            status: 'success', data: {
                result,
                token
            }
        })
    }
    else {
        res.status(400).json({ status: 'fail', data: "user exists. request can't process" })
    }
}

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email }).exec();

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(422).json("Password not match");
        }
        const token = await jwt.sign({
            username: user.username,
            emails: user.email,
            id: user.id
        }, "sabdhan__hack_korbina")

        res.status(200).json({
            status: 'success', data: {
                result: user,
                token
            }
        })
    }
    else {
        res.status(400).json({ status: 'fail', data: "Not authorized user" })
    }
}

exports.getUser = async (req, res) => {
    const result = await userModel.find({});
    res.status(200).json(result);
}

exports.createUser = async (req, res) => {
    const { username, email, password, mobile, address, gender, image } = req.body;
    const securePass = await bcrypt.hash(password, 10);
    let image_list = [];
    if (req.files) {
        if (req.files) {
            const images = req.files.image;
            images.forEach((image) => {
                image_list.push(uploadFile(image, "uploads/users"));
            });
        }
    }

    const newUser = new userModel({
        username,
        email,
        password: securePass,
        mobile,
        address,
        image: image_list,
        gender,
        role: "user"
    });

    const user = await userModel.findOne({ email: email })
    if (!user) {
        const result = await newUser.save();
        console.log(result);
        res.status(200).json(result);
    }
    else {
        console.log("user exist");
        res.status(404).json("Invalid Request");
    }

}

exports.getSingleUser = async (req, res) => {
    const id = req.params.id
    const result = await userModel.findById(id);
    res.status(200).json({ status: "success", result });
}

exports.updateUser = async (req, res) => {

    try {
        const body = req.body;
        const updateId = body._id;
        const image = body.image;
        delete body._id;

        let image_list = [];
        if (req.files) {
            if (req.files) {
                const images = req.files.image;
                images.forEach((image) => {
                    image_list.push(uploadFile(image, "uploads/users"));
                });
            }
        }

        let result = await userModel.updateOne(
            { _id: ObjectId(updateId) },
            {
                ...body,
            }
        )
        result = await userModel.findById(updateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ data: "Request failed", msg: error.message });
    }
}

exports.makeAdmin = async (req, res) => {
    const updateId = req.body._id;
    let user = await userModel.findOne({ _id: ObjectId(updateId) })
    user.role = req.body.role;
    user.save()
    res.json(user);
    // const result = await userModel.updateOne(userId, { role:req.body.role});
    // res.status(200).json({ status: "make Admin succcesfully done" });
}

exports.deleteUser = async (req, res) => {
    const deleteId = req.params.id;
    const query = { _id: ObjectId(deleteId) };
    const result = await userModel.deleteOne(query);
    console.log("delete hoise----> ", result);
    res.status(200).json({ status: 'success', data: result })
}

exports.resetVerify = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    const email = req.body.email;
    const user = await userModel.findOne({ email: email }).exec()

    const token = await jwt.sign({
        username: user.username,
        email: user.email,
        id: user.id
    }, process.env.JWT_SECRET, { expiresIn: "10m" })

    if (user) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                // user: "anisuzzaman1199@gmail.com",
                // pass: "qqlywyiicrtoequk",
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
            },
        });
        // let info = await transporter.sendMail({
        //     from: process.env.MAIL_USER_EMAIL, // sender address
        //     to: "anisuzzaman1199@gmail.com", // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Testing Pourpose", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // });
        const mailOptions = {
            // from: "anisuzzaman1199@gmail.com",
            // to: "a.zamanfac@gmail.com",
            from: process.env.USER_EMAIL,
            to: process.env.TO_USER_EMAIL,
            subject: "Reset password",
            text: "Click the link below to change your password",
            html: `<div style=" width: 500px;margin: 0 auto; margin-top: 10px;text-align: center;">
            <img width="180" src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png" alt="">
            <p style="font-size: 20px;line-height: 1.5em;color: purple;">Hi! ${process.env.TO_USER_EMAIL}, We're sending you this email because you requested a password reset. Click on this button to create a new password:</p>
            <button style=" margin: 12px;padding: 15px 30px;border-radius: 25px;background-color: #ff3f55;border: none;"><a
                    style=" text-decoration: none;font-size: 20px;font-weight: bold;color: white;" href="http://localhost:3000/#/resetpasswordform?t=${token}">Reset your
                    password</a></button>
            <p style="font-size: 20px;line-height: 1.5em;color: purple;">If you didn't request a password reset, you can
                ignore this email. Your password will not be changed.</p>
            <p style="font-size: 20px;line-height: 1.5em;color: purple;">If you got this mail as spam, then click on "looks safe" or "not spam". Hopefully, the button will work. If the button is not working, then mail your message to the TechParkIt.org.com email address or call 0130000000.
            </p>
        </div>`
        }

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("kichu ekta hoise", error);
            } else {
                console.log("Email sent:" + info.response);
                // do something useful
            }
        });

        res.json({ status: "Your password reset email was sent to your verified email. Please check!", mailOptions })
    }
    else {
        res.json("Sorry request not processed")
    }
}

exports.resetPass = async (req, res) => {
    const { password, re_password, userToken } = req.body;
    console.log(password, re_password);

    try {
        const decoded = await jwt.verify(userToken, process.env.JWT_SECRET);
        const verifyUser = await userModel.findOne({ _id: decoded.id }).exec()
        console.log("verifyInfo: " + verifyUser);
        if (!verifyUser) {
            return res.status(422).json({ err_msg: "The user request not matched with the expected response" })
        }
        if ((password && re_password) && password === re_password) {
            const changePass = await bcrypt.hash(password, 10);
            let updatePass = await userModel.updateOne(
                { _id: ObjectId(verifyUser._id) },
                { password: changePass }
            )
            return res.status(200).json({
                success_msg: "password updated",
                success_for: "your password has been updated"
            })
        }
        else {
            res.status(422).json({
                error_msg: "password do not match",
                error_for: "Password Not Matched"
            })
        }
    } catch (error) {
        return res.status(406).json({
            error_msg: error.message,
            error_for: "This link has expired",
        });
    }
}