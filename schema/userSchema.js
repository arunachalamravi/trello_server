const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    id:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})
const UserSchema =new  mongoose.model("userSchemas",schema)

module.exports = UserSchema
