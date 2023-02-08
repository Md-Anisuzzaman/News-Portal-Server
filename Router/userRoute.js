const express = require('express');
const router = express.Router();
const authMiddleware =  require("../Middleware/authMiddleWare");
const {getUser,InsertUser,LoginUser,deleteUser,makeAdmin,updateUser} = require('../Controller/userController');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

router.post("/register",InsertUser);
router.post("/login",LoginUser);
router.get("/delete-all",deleteUser);

// router.use(authMiddleware);


router.get("/user/test",(req,res)=>{
    console.log("hello world");
    return res.status(200).json({req:req.userData})
});

router.get("/allusers",getUser);
router.post("/deleteUser/:id",deleteUser);
router.post("/updateUser/:id",updateUser);
router.post("/makeAdmin/:id",makeAdmin);


module.exports = router;



