const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleWare");
const userController = require('../Controllers/userController');


router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/delete-all", userController.deleteUser);

// router.use(authMiddleware);


router.get("/user/test", (req, res) => {
    console.log("hello world");
    return res.status(200).json({ req: req.userData })
});

router.get("/allusers", userController.getUser);
router.post("/deleteUser/:id", userController.deleteUser);
router.post("/updateUser/:id", userController.updateUser);
router.post("/makeAdmin/:id", userController.makeAdmin);


module.exports = router;



