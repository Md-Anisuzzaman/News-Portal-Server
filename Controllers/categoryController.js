const ObjectId = require('mongoose').Types.ObjectId;
// const ObjectId = require('mongodb').ObjectID;
const categoryModel = require('../Models/categoryModel')


exports.createCategory = async (req, res) => {

    let data = { ...req.body }
    data.creator = ObjectId(req.userData.id);

    const newCategory = new categoryModel(data);
    // console.log(data);
    const result = await newCategory.save();

    res.status(200).json({
        status: "success", data: {
            result
        }
    });
};

exports.getCategory = async (req, res) => {
    const result = await categoryModel.findOne({
        _id:req.params.id
    }).populate('creator').exec();
    console.log(result);
    res.status(200).json({ request: result })
}

exports.updateCategory = async (req, res) => {

}

exports.deleteCategory = async (req, res) => {

}