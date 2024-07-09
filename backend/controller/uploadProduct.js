async function UploadProductController(req,res){
    try{
      const UploadProduct = new productModel(req.body)
      const saveProduct=await UploadProduct.save()
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}