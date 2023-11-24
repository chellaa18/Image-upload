var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const termsModel = require('../model/termsModel');


router.get("/", async (req, res, next) => {
  try {
    res.json({ content: "<p>Testing Ck Html Content from CKEditor</p>" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/terms", async (req, res) => {
  try {
    console.log(req.body); 

    const newData = new termsModel({
      termsData: req.body.termsData,
    });
    const savedData = await newData.save();

    // res.json(savedData);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something Went Wrong", error: error.message });
  }
});

router.get("/terms", async (req, res, next) => {
 
    try {
      await termsModel.find({})
        .then((data) => res.json({ data }))
        .catch((err) => res.json(err));
    } catch (error) {
      console.log(error);
    }
 
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const secretKey = "sdfsdfsdfsdf";

    if (username === "admin" && password === "123") {
      const adminToken = jwt.sign({ role: "admin" }, secretKey, {
        expiresIn: "1hr",
      });
      return res.status(201).json({
        token: adminToken,
        message: "Admin login success",
      });
    } else {
      res.json({ message: "email or password is Invalid!" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});



module.exports = router;
