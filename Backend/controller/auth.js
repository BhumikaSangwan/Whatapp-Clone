import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import User from '../models/user.js';
// import Chat from '../models/chats.js';
// import ChatList from '../models/chatList.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SECRET_KEY = "login-key";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home route
const home = (req, res) => {
  res.send("Welcome to the Chat App!");
};

// Login route
const login = async (req, res) => {
  console.log("Login request received");
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
  res.header("Access-Control-Allow-Credentials", "true");

  const { email, password } = req.body;
  console.log("Body:", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000 
    });

    res.cookie('userId', user._id.toString(), {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000
    });

    console.log("Token generated:", token);
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Sign-up route
const signUp = async (req, res) => {
  console.log("Sign Up request received");
  const { username, email, password } = req.body;
  console.log("Body:", req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      dp: null,
      status: true
    });

    await newUser.save();
    console.log("User created successfully!");

    // const otherUsers = await User.find({ email: { $ne: email } });

    // for (const otherUser of otherUsers) {
    //   // Create chat entry
    //   const chat = new Chat({
    //     sender: otherUser._id,
    //     receiver: newUser._id,
    //     messages: [
    //       {
    //         text: "Hii",
    //         timestamp: new Date(),
    //         senderId: otherUser._id
    //       }
    //     ]
    //   });

    //   await chat.save();

      // Add to chat list
      // const chatListEntry = new ChatList({
      //   userId: newUser._id,
      //   chatId: chat._id,
      //   lastMessage: "Hii",
      //   lastMessageTime: new Date()
      // });

      // await chatListEntry.save();
    // }

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Error during registration", error });
  }
};

// Check cookies route
// const checkCookies = (req, res) => {
//   console.log("Cookies received:", req.cookies);
//   res.json({ cookies: req.cookies || "No cookies found" });
// };

export { home, login, signUp};
