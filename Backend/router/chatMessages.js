import express from "express";
import Messages from "../models/messageSchema.js"; 
import path from 'path';

const router = express.Router();

console.log("messages router");

router.post("/sendMessage", async (req, res) => {
  try {
      console.log("Inside sendMessage route");
      const { senderId, receiverId , text} = req.body;

      if (!senderId || !receiverId || !text) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      console.log("Creating new message:", { senderId, receiverId, text });

      const newMessage = new Messages({ senderId, receiverId, text });
      const savedMessage = await newMessage.save();

      console.log("Message saved successfully:", savedMessage);
      res.status(201).json(savedMessage);
  } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

router.get('/', async (req, res) => {
  const { senderId, receiverId } = req.query;

  if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Missing senderId or receiverId parameter" });
  }

  try {
      const messages = await Messages.find({
          $or: [
              { senderId, receiverId },
              { senderId: receiverId, receiverId: senderId }
          ]
      }).sort({ createdAt: 1 });
      res.json(messages);
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
});

router.get('/lastMessage', async (req, res) => {
  const { senderId, receiverId } = req.query;

  if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Missing senderId or receiverId parameter" });
  }

  try {
      const lastMessage = await Messages.findOne({
          $or: [
              { senderId, receiverId },
              { senderId: receiverId, receiverId: senderId }
          ]
      }).sort({ createdAt: -1 });
      res.json(lastMessage);
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
});


// router.get("/:receiverId/:senderId", async (req, res) => {
//     try {
//       console.log("inside get messages");
//       const { senderId, receiverId } = req.params;
//       const messages = await Messages.find({
//         $or: [
//           { senderId, receiverId },
//           { senderId: receiverId, receiverId: senderId },
//         ],
//       }).sort({ _id: 1 });
  
//       res.json(messages);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching messages" });
//     }
//   });

export default router;
