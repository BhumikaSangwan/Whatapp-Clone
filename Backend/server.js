import express from 'express';
import path from 'path';
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose'
import Messages from './models/messageSchema.js';

import authRouter from './router/auth.js'
import whatsappRouter from './router/whatsapp.js'
import chatMessages from './router/chatMessages.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 9000;
const httpServer = http.createServer(app);
const server = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH"],
        credentials: true,
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb://localhost:27017/Whatsapp')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser())
app.use(cors({
    // origin: "*",
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"]             
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

//     // Handle preflight requests
//     if (req.method === "OPTIONS") {
//         return res.status(200).end();
//     }

//     next();
// });

app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    console.log("Origin:", req.headers.origin);
    next();
});

const users = {}
// app.set('socketio', server);
// app.set('users', users);

app.get("/", (req, res) => res.send("Hello World!"));
app.use('/users', authRouter);
app.use('/whatsapp', whatsappRouter)
// app.use('/whatsapp', whatsappRouter(server, users));
// app.use('/chatlist', chatListRouter);
app.use('/messages', chatMessages);


server.on("connection", (socket) => {
    console.log("user connected");
    socket.emit("message", "Hello from the server!");

    socket.on("connected", (userId) => {
        console.log("userId in connected event : ", userId);
        console.log(`the user ${userId} is connected with socket id : ${socket.id}`);
        users[userId] = socket.id
        console.log("socket users : ", users);
    })

    socket.on("checkOnline", (userId) => {
        console.log("userId in checkOnline event : ", userId);
        console.log("connected users : ", users)
        if (users[userId]) {
            console.log("user is online");
            socket.emit("isOnline", true);
        }
        else {
            console.log("user is offline");
            socket.emit("isOnline", false);
        }
    })

    socket.on("sendMessage", async ({ senderId, receiverId, text, createdAtFormatted }) => {
        try {
            const newMessage = new Messages({ senderId, receiverId, text, createdAtFormatted });
            await newMessage.save();

            const receiverSocket = users[receiverId];
            if (receiverSocket) {
                console.log("time : ", createdAtFormatted);
                socket.to(receiverSocket).emit("getMessage", { senderId, receiverId, text, createdAtFormatted });
            }
        }
        catch (error) {
            console.log("error handling the sendMessage socket");
        }
    })

    socket.on("sendImage", async ({ senderId, receiverId, image, createdAtFormatted }) => {
        console.log("sendImg socket");

        const receiverSocket = users[receiverId];
        if (receiverSocket) {
            console.log("time : ", createdAtFormatted);
            socket.to(receiverSocket).emit("getImage", { senderId, receiverId, image, createdAtFormatted });
        }
    })

    socket.on("getLastMsg", async ({ senderId, receiverId }) => {
        console.log("getLastMsg socket ");
        try {
            console.log("inside try block--lastMsg")
            const receiverSocket = users[receiverId];
            const senderSocket = users[senderId];
            const lastMessage = await Messages.findOne({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            }).sort({ createdAt: -1 });
            console.log("senderSocket : ", senderSocket);
            server.to(senderSocket).emit("lastMsg", lastMessage);
            console.log("sent msg to the sender : ", lastMessage)
            // if (receiverSocket) {
                socket.to(receiverSocket).emit('lastMsg', lastMessage);
                console.log("sent msg to the receiver");
            // }
        }
        catch (error) {
            console.log("error handling the getLastMsg socket : ", error);
        }
    })

})


httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));