const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs-extra')
const newsModel = require('../Models/newsModel')
const { uploadFile } = require('./imageUploadControler');
// const { Result } = require('express-validator');

exports.createNews = async (req, res) => {

    let { title, author, description, creator, image } = req.body
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

    const new_News = new newsModel({
        title,
        author,
        image: image_list,
        description,
        creator
    });
    const result = await new_News.save();
    try {
        res.status(200).json({
            status: "success",
            data: { result }
        });
    } catch (error) {
        console.log(er);
    }
};

exports.AllNews = async (req, res, next) => {
    const result = await newsModel.find({});
    res.status(200).json({ result });
}

exports.getNews = async (req, res, next) => {
    const result = await newsModel.findOne({
        _id: ObjectId(req.params.id)
    }).populate('creator');
    res.status(200).json({ result: result })
}

exports.updateNews = async (req, res) => {
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

        let result = await newsModel.updateOne(
            { _id: ObjectId(updateId) },
            {
                ...body,
            }
        )

        result = await newsModel.findById(updateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ data: "Request failed", msg: error.message });
    }
}

exports.deleteNews = async (req, res) => {
    const deleteId = req.params.id;
    const query = { _id: ObjectId(deleteId) };
    const result = await newsModel.deleteOne(query);
    console.log("You deleted a news----> ", deleteId, result);
    res.status(200).json({ status: 'success', data: result })
}