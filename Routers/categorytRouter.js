const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/categoryController');
const authmiddleWare = require('../Middleware/authMiddleWare');

router.get('/getcategory/:id', authmiddleWare, categoryController.getCategory)
router.get('/all-category', authmiddleWare, categoryController.AllCategory)
router.post('/categoryCreate', authmiddleWare, categoryController.createCategory)
router.post('/deletecategory/:id', authmiddleWare, categoryController.deleteCategory)
router.post('/updatecategory', authmiddleWare, categoryController.updateCategory)

module.exports = router;