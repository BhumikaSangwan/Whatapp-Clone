import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt"
import User from '../models/user.js'
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser'
// import Login from '../Auth/login.jsx'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SECRET_KEY = "login-key";
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const home = (req, res) => {
  res.send("home");
};

const login = async (req, res) => {
  console.log("login request received");
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
  res.header("Access-Control-Allow-Credentials", "true");
  const { email, password } = req.body;
  console.log("Body : ", req.body)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User doesn't exist");
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    // if (user.password !== password) {
      console.log("Invalid pwd");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
          { userId: user._id }, 
          SECRET_KEY, 
          { expiresIn: "1h" }
        );

    res.cookie('token', token, {
          httpOnly : true,
          secure : false,
          sameSite : 'Lax',
          // maxAge : 3600000
    })    
    console.log("Token : ", token);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {

    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Sign Up request received");
  console.log("Body : ", req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log("User created successfully !!!!!");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error : ", error);
    console.log("Error signing up !!!!");
    res.status(500).json({ message: "Error signing up-------  ", error });
  }
}

const checkcookies = (req, res) => {
  console.log("Cookies received:", req.cookies);
  res.json({ cookies: req.cookies  || "No cookies found"});
};

export { home, login, signUp ,checkcookies};