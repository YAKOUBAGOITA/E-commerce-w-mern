import addToCartModel = require("../../models/cartProduct")

const addToCartController =async(req,res)=>{
   try{
        const { productId }=req?.body
        const currentUeser=req.userId
        

        const isproductAvailable = await addToCartModel.find({ productId })

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUeser
        }

   }catch(err){
    res.json({
        message : err?.message || err,
        error : true,
        success : false
    })
   }

}