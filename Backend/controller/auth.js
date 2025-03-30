import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import User from '../models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SECRET_KEY = "login-key";
const app = express();
const generatedOtp =  () => Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
// const resetRequests = []


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home route
const home = (req, res) => {
  res.json({ message: "Welcome to the Chat App!" });
};

// Email route
const email = (req, res) => {
  console.log("Email request received");
  // res.json({message : "Welcome to the Chat App!"});
  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "dummyfortesting136@gmail.com",
      pass: "jazu deru ckdw tlrj",
    }
  });

  const userEmail = req.body.email;
  async function sendEmail() {

    const user = await User.findOne({ email: userEmail, state: "active" });
    if (!user) {
      // console.log("User not found");
      return res.status(401).json({ message: "User does not exist" });
    }
    const userOtp = generatedOtp();

    const resetToken = jwt.sign({ email: userEmail}, SECRET_KEY, { expiresIn: '5m' });

    await User.findOneAndUpdate({ email: userEmail }, { otp: userOtp, resetToken: resetToken });

    const info = await transporter.sendMail({
      from: '"Whatsapp Clone" <dummyfortesting136@gmail.com>',
      // to: userEmail,
      to : "bhumikasangwan1362006@gmail.com",
      subject: "Reset Password",
      text: "Check your email", // falls back to text if html is not supported/rendered by email client
      html: "<b>Your 6-digits OTP to reset the password : " + userOtp + ".<br/>Do not share it with anyone.</b>",
    });

    console.log("Generated otp : ", userOtp);

    res.cookie('resetToken', resetToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 5 * 60 * 1000
    });
  }

  sendEmail()
    .then(() => {
      console.log("Email received successfully : ", userEmail);
      return res.status(200).json({ message: "Email sent successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Error sending email" });
    });
};


const otp = async (req, res) => {
  console.log("OTP request handled!");
  const { otp } = req.body;
  const resetToken = req.cookies.resetToken;
  console.log("otp:", otp);

  jwt.verify(resetToken, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized or Token expired" });
    }

    const { email } = decoded;
    console.log("email in otp:", email);
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user otp : ", user.otp);
    console.log("input otp : ", otp)
    if (user.otp != otp) {
      console.log("otp didn't match");
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const otpVerifiedToken = jwt.sign({ verified: true }, SECRET_KEY, { expiresIn: '5m' });
    console.log("otp token set");
    res.cookie('otpVerifiedToken', otpVerifiedToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 5 * 60 * 1000
    });

    console.log("OTP verified");
    return res.status(200).json({ message: "OTP verified successfully" });
  });
};




const resetPwd = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      console.log("new pwd not found");
      return res.status(400).json({ message: "New password is required" });
    }

    // Get tokens from cookies
    const verifyOtpToken = req.cookies.otpVerifiedToken;
    const resetToken = req.cookies.resetToken;

    if (!verifyOtpToken || !resetToken) {
      return res.status(401).json({ message: "Unauthorized or Token expired" });
    }

    // Verify OTP token
    let decodedOtp;
    try {
      decodedOtp = jwt.verify(verifyOtpToken, SECRET_KEY);
      if (!decodedOtp.verified) {
        return res.status(401).json({ message: "Unauthorized or Token expired" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized or Token expired" });
    }

    // Verify reset token
    let decodedReset;
    try {
      decodedReset = jwt.verify(resetToken, SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized or Token expired" });
    }

    const { email } = decodedReset;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password safely
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    console.log("Password reset successfully for user:", email);

    // Clear reset token
    res.clearCookie("resetToken");

    return res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const login = async (req, res) => {
  console.log("Login request received");
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");

  const { email, password } = req.body;
  console.log("Body:", req.body);
  res.clearCookie("resetToken");
  res.clearCookie("otpVerifiedToken");

  try {
    const user = await User.findOne({ email: email, state: "active" });
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

export { home, login, signUp, email, resetPwd, otp };
