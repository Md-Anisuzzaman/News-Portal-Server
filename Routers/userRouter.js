const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const authMiddleware = require("../Middleware/authMiddleWare");
const userController = require('../Controllers/userController');


router.post("/register",
    [
        body('email')
            .normalizeEmail()
            .notEmpty().withMessage('email is empty')
            .isEmail().withMessage('not of email type')
            .custom(async (value) => {
                let user = await userModel.findOne({
                    email: value
                })
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            }).withMessage('E-mail already in use'),

        check('username')
            .not().isEmpty().withMessage('username is required'),

        body('password')
            .not().isEmpty().withMessage('password is required')
            .isLength({
                min: 6,
            }).withMessage('min length 6'),
    ], userController.registerUser);

router.post("/login", userController.loginUser);
router.get("/delete-all", userController.deleteUser);
router.post("/adduser", userController.createUser);

// router.use(authMiddleware);


router.get("/user/test", (req, res) => {
    console.log("hello world");
    return res.status(200).json({ req: req.userData })
});

router.get("/allusers", userController.getUser);
router.get("/user/:id", userController.getSingleUser);
router.post("/updateuser", userController.updateUser);
router.post("/makeAdmin", userController.makeAdmin);
router.post("/deleteuser/:id", userController.deleteUser);
// router.post("/deleteuser", userController.deleteUser);


module.exports = router;



