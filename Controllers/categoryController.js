const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs-extra')
const categoryModel = require('../Models/categoryModel')

exports.createCategory = async (req, res) => {

    let data = { ...req.body }
    // data.creator = ObjectId(req.userData.id);
    data.creator = req.userData.id;

    const newCategory = new categoryModel(data);
    const result = await newCategory.save();

    res.status(200).json({
        status: "success", data: {
            result
        }
    });
};

exports.AllCategory = async (req, res, next) => {
    const result = await categoryModel.find({});
    res.status(200).json({ result: result });
}

exports.getCategory = async (req, res, next) => {
    console.log(req.params);
    const result = await categoryModel.findOne({
        _id: ObjectId(req.params.id)
    }).populate('creator');

    // const { id } = req.params;
    // const idmatch = { _id: id };
    // const result = await categoryModel.findOne().populate({
    //     path: 'creator',
    //     match: idmatch
    // });

    console.log(result);
    res.status(200).json({ request: result })
}

exports.updateCategory = async (req, res) => {

}

exports.deleteCategory = async (req, res) => {

}