const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/categoryController');
const authmiddleWare = require('../Middleware/authMiddleWare');


router.get('/getCategory/:id', authmiddleWare, categoryController.getCategory)
router.get('/all-category', authmiddleWare, categoryController.AllCategory)
router.post('/categoryCreate', authmiddleWare, categoryController.createCategory)

module.exports = router;