const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req?.userId;

        // Ensure the user is logged in
        if (!currentUser) {
            return res.status(401).json({
                message: "Please login..!",
                success: false,
                error: true
            });
        }

        // Check if the product already exists for the logged-in user
        const isProductAvailable = await addToCartModel.findOne({ 
            productId, 
            userId: currentUser 
        });

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in add to cart",
                success: false,
                error: true
            });
        }

        // Create a new cart item
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        };

        const newAddToCart = new addToCartModel(payload);
        await newAddToCart.save();

        res.json({
            message: "Product added",
            success: true,
            error: false
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
