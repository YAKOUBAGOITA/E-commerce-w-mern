const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (err) {
        console.error("Failed to connect to DB", err);
    }
}

module.exports = connectDB;
