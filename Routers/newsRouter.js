const express = require('express');
const router = express.Router();

const newsController = require('../Controllers/newsController');
const authmiddleWare = require('../Middleware/authMiddleWare');

router.post('/createnews', authmiddleWare, newsController.createNews)
router.get('/getnews/:id', authmiddleWare, newsController.getNews)
router.get('/allnews', authmiddleWare, newsController.AllNews)
router.post('/deletenews/:id', authmiddleWare, newsController.deleteNews)
router.post('/updatenews', authmiddleWare, newsController.updateNews)

module.exports = router;