const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');
const { uploadFile } = require('./imageUploadControler');

exports.registerUser = async (req, res) => {

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
        }, "sabdhan__hack_korbina")

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

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email }).exec();
    // const isMatch = await bcrypt.compare(password, user.password);

    if (user) {
        const token = jwt.sign({
            username: user.username,
            emails: user.email,
            id: user.id
        }, "sabdhan__hack_korbina")

        res.status(200).json({ status: 'success', data: token })
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
        // delete body.image;

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
        res.status(400).json({data: "Request failed", msg: error.message});
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
