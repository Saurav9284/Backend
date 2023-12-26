const {Router} = require("express");
const bcrypt = require("bcrypt");
const {UserModel} = require('../models/User.model')
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userController = Router();



userController.post("/signup", (req,res)=> {
    const {name ,email , password, phone_number,department} = req.body;
    bcrypt.hash(password,5, async function(err,hash){
        if(err){
            res.send({msg: "Somthing went wrong"})
        }
        const user = new UserModel({
            name,
            email,
            password : hash,
            phone_number,
            department  
        })
        try {
            await user.save();
            res.send({msg: "Singup successfull"})
        } catch (error) {
            console.log(error)
            res.send({msg: "Somthing went wrong"});
        }
    })
});


userController.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.send({msg: "signup first"});
    }
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        res.send({msg: "Something went wrong"});
      }
      if(result) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.send({message: "Login Successful", token });
      } else {
        res.send({msg: "Invalid Credential"});
      }
    });
  });
  


module.exports = {
    userController
}