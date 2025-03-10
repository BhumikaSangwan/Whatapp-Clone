import express from 'express';
import ChatList from '../models/chatList.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userId = req.cookies.userId;
        console.log("userId inside the chatlist request : ", userId);

        const chatList = await ChatList.findOne({ userId })
            // .populate('chats.chatUserId', 'username dp')
            // .lean();

        if (!chatList) {
            console.log("Chat list not found");
            return res.status(404).json({ message: 'Chat list not found' });
        }

        // Format response
        const formattedChatList = chatList.chats.map(chat => {
            if (chat.chatUserId) { // Check if chatUserId is populated
                return {
                    chatUserId: chat.chatUserId._id,
                    username: chat.chatUserId.username,
                    dp: chat.chatUserId.dp || null,
                    lastMessage: chat.lastMessage || 'No messages',
                    timestamp: chat.timestamp || null
                };
            } else {
                return {
                    chatUserId: null,
                    username: null,
                    dp: null,
                    lastMessage: chat.lastMessage || 'No messages',
                    timestamp: chat.timestamp || null
                };
            }
        });

        res.json(formattedChatList);
    } catch (error) {
        console.error("Error in chatList route:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;