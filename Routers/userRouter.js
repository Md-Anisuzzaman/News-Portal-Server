const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const userModel = require('../Models/userModel');
const authMiddleware = require("../Middleware/authMiddleWare");
const userController = require('../Controllers/userController');

router.post("/register",
    [
        body('email')
            .normalizeEmail()
            .isEmail().withMessage('Not of email type')
            .not().isEmpty()?.withMessage('Email is empty')
            .custom(async (value) => {
                let user = await userModel.findOne({
                    email: value
                })
                if (user) {
                    return Promise.reject('E-mail is already in use');
                }
            }).withMessage('E-mail is already in use'),

        check('username')
            .not().isEmpty().withMessage('Username is required'),

        body('password')
            .not().isEmpty().withMessage('Password is required')
            .isLength({
                min: 8,
            }).withMessage('Password minimum length 8'),
    ], userController.registerUser);

router.post("/login",
    [
        body('email')
            .normalizeEmail()
            .not().isEmpty().withMessage('Email is empty')
            .isEmail().withMessage('Not of email type')
            .custom(async (value) => {
                let user = await userModel.findOne({
                    email: value
                })
                if (!user) {
                    return Promise.reject('Not Authenticated user email');
                }
            }).withMessage('Not Authenticated email'),

        body('password')
            .not().isEmpty().withMessage('Password is required'),
    ],
    userController.loginUser);

router.post("/resetverify",
    [
        body('email')
            .normalizeEmail()
            .not().isEmpty().withMessage('Email is empty')
            .isEmail().withMessage('Not of email type')
            .custom(async (value) => {
                let user = await userModel.findOne({
                    email: value
                })
                if (!user) {
                    return Promise.reject('Not Authenticated user email');
                }
            }).withMessage('Not Authenticated email'),
    ], userController.resetVerify);
router.post("/resetpass", userController.resetPass);

router.use(authMiddleware);


router.get("/delete-all", userController.deleteUser);
router.post("/adduser", userController.createUser);
router.get("/allusers", userController.getUser);
router.get("/user/:id", userController.getSingleUser);
router.post("/updateuser", userController.updateUser);
router.post("/makeAdmin", userController.makeAdmin);
router.post("/deleteuser/:id", userController.deleteUser);
// router.post("/deleteuser", userController.deleteUser);


module.exports = router;



