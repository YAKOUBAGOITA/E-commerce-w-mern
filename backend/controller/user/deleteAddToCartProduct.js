const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct=async(req,res)=>{
    try{
       const currentUser=req.userId
       const addTocartProductId=req?.body?._id

       const deleteProduct =await addToCartModel.deleteOne({_id:addTocartProductId})
 
       res.json({
        message:"Product Deleted from the Cart",
        error:false,
        success:true,
        data:deleteProduct
       })
    }catch(err){
        res.json({
            message:err?.message|| err,
            error:true,
            success:false
        })

    }
}
module.exports=deleteAddToCartProduct