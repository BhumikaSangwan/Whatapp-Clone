import mongoose from "mongoose";

//schema
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String
    }
},
{timestamps : true}
)


//declare model
const User = mongoose.model('users', userSchema);

export default User;