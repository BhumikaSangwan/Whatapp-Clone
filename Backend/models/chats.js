import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    message: String,                   
    timestamp: { type: Date, default: Date.now }, 
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" } 
  });
  
const Chat = mongoose.model("Chat", chatSchema);

export default Chat