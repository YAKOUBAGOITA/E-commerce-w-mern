const userModel = require('../models/userModel'); // Adjust the path according to your project structure

async function userDetailsController(req, res){
    try{
        console.log("userId",req.userId)

        const user=await userModel.findById(req.userId)
         res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"User details"

         })

        console.log("user", user)
   
        res.status(200).json({ userId: req.userId, user });
    }catch(err){
         res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
         })
    }
}
module.exports=userDetailsController