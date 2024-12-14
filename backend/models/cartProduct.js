const mongoose =require('mongoose')

const addToCart = mongoose.Schema({
    productId: String,
    quantity: Number,
    userId: String,
},{
    timestamps:true
})

const addToCartModel = mongoose.model('addToCart', productSchema);

module.exports = addToCartModel;