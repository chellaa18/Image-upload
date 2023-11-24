var express = require("express");
var router = express.Router();
const multer = require("multer");
const User = require("../model/userModel");

//userControllers
const userController = require('../controllers/userController')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });



//userRoutes
router.get("/", userController.get);

router.post("/", userController.post);

router.get("/fetchuser/:id", userController.fetchUserbyID);

router.delete("/deleteuser/:id",userController.deleteUser);

router.put("/updateuser/:id", userController.updateUser);

router.post("/login", userController.login);

router.get("/getSingle", userController.getSingle);


// Define the route to serve the file



module.exports = router;
