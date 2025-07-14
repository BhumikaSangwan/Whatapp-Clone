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
import jwt from "jsonwebtoken";
import cookie from 'cookie';
import { status } from "./constants/index.js"

const app = express();
const PORT = 9000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH"],
        credentials: true,
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
        skipMiddlewares: false,
    },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECRET_KEY = "login-key";

mongoose.connect('mongodb://localhost:27017/Whatsapp')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });

io.use((socket, next) => {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) {
        console.log(" No cookies found in handshake");
        return next(new Error("Authentication error"));
    }

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;

    if (!token) {
        console.log(" Token not found in cookies");
        return next(new Error("Authentication error"));
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        socket.userId = decoded.userId;
        return next();
    } catch (err) {
        console.log(" Token verification failed:", err.message);
        return next(new Error("Authentication error"));
    }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"]             
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    // console.log("Origin:", req.headers.origin);
    next();
});

const users = {}

app.get("/", (req, res) => res.send("Hello World!"));
app.use('/users', authRouter);
app.use('/whatsapp', whatsappRouter)
app.use('/messages', chatMessages);

io.on("connection", (socket) => {
    const userId = socket.userId;

    if (!userId) {
        console.log("Unauthorized socket, disconnecting");
        return socket.disconnect(true);
    }

    if (!users[userId]) {
        users[userId] = [];
    }
    users[userId].push(socket.id);
    socket.join(userId);

    (async () => {
    try {
        const undeliveredMessages = await Messages.find({
            receiverId: userId,
            seen: status.undelivered
        }).sort({ createdAt: 1 });

        if (undeliveredMessages.length > 0) {
            socket.emit("missedMessages", undeliveredMessages);

            // Update seen status to delivered
            const ids = undeliveredMessages.map(msg => msg._id);
            await Messages.updateMany({ _id: { $in: ids } }, { $set: { seen: status.delivered } });
        }
    } catch (err) {
        console.error(" Failed to deliver undelivered messages:", err);
    }
})();


    socket.on("disconnect", () => {

        if (users[userId]) {
            users[userId] = users[userId].filter(id => id !== socket.id);
            if (users[userId].length === 0) {
                delete users[userId];
            }
        }
    });


    socket.on("getMissedMessages", async ({ senderId }) => {
    try {
        const filter = {
            receiverId: userId,
            seen: status.undelivered,
        };
        if (senderId) filter.senderId = senderId;

        const messages = await Messages.find(filter).sort({ createdAt: 1 });

        const messageIds = messages.map(msg => msg._id);
        await Messages.updateMany(
            { _id: { $in: messageIds } },
            { $set: { seen: status.delivered } }
        );

        socket.emit("missedMessages", messages);
    } catch (err) {
        console.error("Error in getMissedMessages:", err);
    }
});



    socket.on("checkOnline", (userId) => {
        if (users[userId]) {
            socket.emit("isOnline", true);
        }
        else {
            socket.emit("isOnline", false);
        }
    })


    socket.on("sendMessage", async ({ senderId, receiverId, text, createdAtFormatted }, callback) => {
    try {
        const isReceiverOnline = !!users[receiverId] && users[receiverId].length > 0;

        const newMessage = new Messages({
            senderId,
            receiverId,
            text,
            createdAtFormatted,
            seen: isReceiverOnline ? status.delivered : status.undelivered
        });

        await newMessage.save();

        if (isReceiverOnline) {
            for (const receiverSocketId of users[receiverId]) {
                const receiverSocket = io.sockets.sockets.get(receiverSocketId);
                if (receiverSocket) {
                    receiverSocket.emit("getMessage", newMessage);
                }
            }
        }

        callback({ success: true, message: "Message saved", data: newMessage });

    } catch (error) {
        console.log("Error in sendMessage:", error);
        callback({ success: false, message: "Failed to save message" });
    }
});



    socket.on("sendImage", async ({ senderId, receiverId, image, createdAtFormatted }) => {

        const receiverSocket = users[receiverId];
        if (receiverSocket) {
            socket.to(receiverSocket).emit("getImage", { senderId, receiverId, image, createdAtFormatted }, {
                recoverable: true,
            });
        }
    })

    socket.on("getLastMsg", async ({ senderId, receiverId }) => {
        try {
            const receiverSocket = users[receiverId];
            const senderSocket = users[senderId];
            const lastMessage = await Messages.findOne({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            }).sort({ createdAt: -1 });
            io.to(senderSocket).emit("lastMsg", lastMessage);
            socket.to(receiverSocket).emit('lastMsg', lastMessage, {
                recoverable: true,
            });
        }
        catch (error) {
            console.log("error handling the getLastMsg socket : ", error);
        }
    })
})


httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));