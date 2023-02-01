const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');

exports.InsertUser = async (req, res) => {

    const { username, email, password } = req.body;
    const securePass = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        username,
        email,
        password: securePass,
        role: "user"
    })

    const token = await jwt.sign({
        username,
        email,
        _id: newUser.id
    },"sabdhan__hack_korbina")
    


    // await userModel.create(reqBody, (err, data) => {

    //     if (err) {
    //         res.status(400).json({ status: 'fail', data: err })
    //     }

    //     else {
    //         res.status(200).json({ status: 'success', data: data })
    //     }
    // })

    const user = await userModel.findOne({ email: email })

    console.log("User Already exist--->", user);

    if (!user) {
        const result = await userModel.create(newUser);
        res.status(200).json({ status: 'success', data: {
            result,
            token
         }})
    }
    else {
        res.status(400).json({ status: 'fail', data: "request can't process" })
    }


}

exports.getUser = async (req, res) => {
    const result = await userModel.find({});
    console.log(result);
    res.status(200).send({ result });

}

exports.updateUser = async (req, res) => {

    const updateId = req.params.id;
    const result = await userModel.updateOne(
        { _id: ObjectId(updateId) },
        { $set: { email: req.body.email } }
    )
    res.status(200).json({ result });

}


exports.makeAdmin = async (req, res) => {

    const updateId = req.params.id;
    // console.log("here is role-----> ", role);

    const toAdmin = { _id: ObjectId(updateId) };
    const result = await userModel.updateOne(toAdmin,{ $set: { role: "admin" } });

    // const result = await userModel.updateOne(
    //     { _id: ObjectId(updateId) },
    //     { $set: { role: "admin" } }
    // )

    res.status(200).json({ status: "make Admin succcesfully done", result });
}
exports.deleteUser = async (req, res) => {
    const deleteId = req.params.id;
    const result = await userModel.deleteOne({ _id: ObjectId(deleteId) });
    console.log("delete hoise----> ", result);
    res.status(200).json({ status: 'success', data: result })


}

