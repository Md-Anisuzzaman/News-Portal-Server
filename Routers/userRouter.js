const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleWare");
const userController = require('../Controllers/userController');


router.post("/register", userController.registerUser);
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


module.exports = router;



