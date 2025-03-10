import mongoose from 'mongoose';

const chatListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },  
    chats: [
      {
        chatUserId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
        lastMessage: String,             
        timestamp: Date,                  
      }
    ]
  });
  
  const ChatList = mongoose.model("ChatList", chatListSchema);
  
export default ChatList;