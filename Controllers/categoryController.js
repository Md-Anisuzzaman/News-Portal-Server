const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs-extra')
const categoryModel = require('../Models/categoryModel')
const { uploadFile } = require('./imageUploadControler');
const { Result } = require('express-validator');

exports.createCategory = async (req, res) => {

    let { title, author, category, description, creator, image } = req.body
    creator = req.userData.id;


    let image_list = [];
    if (req.files) {
        if (req.files) {
            const images = req.files.image;
            images.forEach((image) => {
                image_list.push(uploadFile(image, "uploads/newsImage"));
            });
        }
    }

    const newCategory = new categoryModel({
        title,
        author,
        category,
        image: image_list,
        description,
        creator
    });
    const result = await newCategory.save();
    res.status(200).json({
        status: "success",
        data: {
            result
        }
    });
};

exports.AllCategory = async (req, res, next) => {
    const result = await categoryModel.find({});
    res.status(200).json({ result });
}

exports.getCategory = async (req, res, next) => {
    console.log(req.params);
    const result = await categoryModel.findOne({
        _id: ObjectId(req.params.id)
    }).populate('creator');
    console.log(result);
    res.status(200).json({result:result})
}

exports.updateCategory = async (req, res) => {
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
                    image_list.push(uploadFile(image, "uploads/newsImage"));
                });
            }
        }

        let result = await categoryModel.updateOne(
            { _id: ObjectId(updateId) },
            {
                ...body,
            }
        )
        result = await categoryModel.findById(updateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ data: "Request failed", msg: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    const deleteId = req.params.id;
    const query = { _id: ObjectId(deleteId) };
    const result = await categoryModel.deleteOne(query);
    console.log("delete hoise----> ", result);
    res.status(200).json({ status: 'success', data: result })
}