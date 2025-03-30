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
    },
    dp : {
        type: String,
        default : null
    },
    about : {
        type :String,
        default : 'Hey there! I am using WhatsApp'
    },
    status : {
        type : Boolean
    }, 
    state : {
        type : String,
        default : "active"
    },
    otp : {
        type : Number
    },
    resetToken : {
        type : String
    }
},
{timestamps : true}
)


//declare model
const User = mongoose.model('users', userSchema);

export default User;