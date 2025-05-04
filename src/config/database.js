
const mongoose = require("mongoose");


const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://dg:gogna@dvcode.lageorl.mongodb.net/devTinder")
}

module.exports = {connectDB}







