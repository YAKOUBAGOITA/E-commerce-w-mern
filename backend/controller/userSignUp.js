const userModel=require('../models/userModel')
const bcrypt = require('bcryptjs');

async  function userSignUpController(req,res){
    try{
      const {name, email, password}=req.body
      console.log("req.body",req.body)
      if(!name){
        throw new Error("Please provide name")
      }
      if(!email){
        throw new Error("Please provide email")
      }
      if(!password){
        throw new Error("Please provide password")
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      
      if(!hashPassword){
        throw new Error("Something is wrong")
    }
  
    const payload={
       ...req.body,
       password : hashPassword
    }
    const userData= new userModel(payload)
    const saveUser=userData.save()
  
    res.status(201).json({
      data:saveUser,
      succcess:true,
      error:false,
      message:"User created Succesfully"
    })
  
  }catch(error){
      res.json({
          message : error,
          error : true,
          success :false,
      })
  }
  
}
module.exports= userSignUpController