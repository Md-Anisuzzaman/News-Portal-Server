const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/categoryController');
const authmiddleWare = require('../Middleware/authMiddleWare');

router.get('/getcategory/:id', authmiddleWare, categoryController.getCategory)
router.get('/all-category', authmiddleWare, categoryController.AllCategory)
router.post('/categoryCreate', authmiddleWare, categoryController.createCategory)
router.post('/deleteNews/:id', authmiddleWare, categoryController.deleteCategory)
router.post('/updatenews', authmiddleWare, categoryController.updateCategory)

module.exports = router;