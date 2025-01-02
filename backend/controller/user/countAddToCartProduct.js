const addToCartModel = require("../../models/cartProduct")

const countAddToCartProduct =async(req,res)=>{
 try{
     const userId=req.userId

     const count=await addToCartModel.countDocuments({
          userId:userId
     })
     res.json({
        data:{
            count:count
        },
        message:"ok",
        error:false,
        succes:true,
     })

 }catch(error){
    res.json({
        message:error.message||error,
        error:true,
        succes:false,
    })
 }
}
module.exports= countAddToCartProduct