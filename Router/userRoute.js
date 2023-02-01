const express = require('express');
const router = express.Router();
const {getUser,InsertUser,deleteUser,makeAdmin,updateUser} = require('../Controller/u_controler');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

router.get("/allusers",getUser)
router.post("/InsertUser",InsertUser);
router.post("/deleteUser/:id",deleteUser);
router.post("/updateUser/:id",updateUser);
router.post("/makeAdmin/:id",makeAdmin);


module.exports = router;



