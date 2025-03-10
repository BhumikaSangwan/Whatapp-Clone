import mongoose from 'mongoose';
import User from './user.js';

const messageSchema = new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', 
        required : true
    },
    text : {
        type : String,
    },
    image : {
        type : String,
        default : null
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    createdAtFormatted :{
        type : String,
        default : () => getCurrentTimeInHoursAndMinutes()
    },
    readAt : {
        type : Date,
        default : null
    } 
})

const Messages = mongoose.model("Message", messageSchema);

function getCurrentTimeInHoursAndMinutes() 
{
    let date = new Date();
    let hours = date.getHours().toString().padStart(2,'0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`
}

export default Messages