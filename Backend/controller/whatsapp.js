import jwt from "jsonwebtoken";
import User from "../models/user.js";
import chats from "../models/chats.js";
import path from 'path';

const SECRET_KEY = "login-key";

const getWhatsAppData = (req, res) => {
  console.log("Welcome to WhatsApp");
  // res.send(req.cookies);
  res.status(200).json({ "message": "Authenticated" });
};

const sendUserId = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(403).json({ message: "Unauthorized. Please log in." });
    }

    const users = await User.find({});
    const user = users.filter(usr => usr._id === userId)

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    console.log("send user id : ", user._id);

    res.status(200).send(user._id);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Profile = async (req, res) => {
  console.log("get profile");
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.dp) {
      res.sendFile(path.resolve(user.dp));
    } else {
      res.status(200).json({ dp: null });
    }
  } catch (err) {
    console.error("Error fetching user name:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const userProfile = async (req, res) => {
  console.log("get user profile");
  try {
    const userId = req.query.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("sending user dp");
    if (user.dp) {
      res.sendFile(path.resolve(user.dp));
    } else {
      res.status(200).json({ dp: null });
    }
  } catch (err) {
    console.error("Error fetching user name:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const Name = async (req, res) => {
  console.log("get name");
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("name : ", user.username);
    res.status(200).json({ name: user.username });
  } catch (err) {
    console.error("Error fetching user name:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateName = async (req, res) => {
  console.log("update name");
  try {
    const userId = req.user.userId;
    const { username } = req.body;
    console.log("userId : ", userId);
    console.log("username to be updated to  : ", username);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: username },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("updatedUser : ", updatedUser);

    res.status(200).json({ message: "Name updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating user name:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const About = async (req, res) => {
  console.log("get about");
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("about : ", user.about);
    res.status(200).json({ about: user.about });
  } catch (err) {
    console.error("Error fetching user about:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateAbout = async (req, res) => {
  console.log("update name");
  try {
    const userId = req.user.userId;
    const { about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { about: about },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "About updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating user about:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  console.log("logout");

  try{
    const userId = req.user.userId;
    console.log("inside logout try block");
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      console.log("logout user not found")
      return res.status(404).json({ message: "User not found" });
    }
    console.log("logout successful")
    res.status(200).json({ message: "Logout successful" });
  }
  catch{
    console.log("inside logout catch block");
    res.status(500).json({ message: "Internal server error" });
  }
}

const Users = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log("inside users block, userId : ", userId);

    if (!userId) {
      return res.status(403).json({ message: "Unauthorized. Please log in." });
    }

    const allUsers = await User.find({});

    if (!allUsers.length) {
      return res.status(404).json({ message: "No users found" });
    }

    const users = allUsers.filter(user => user._id.toString() !== userId)

    const me = allUsers.filter(user => user._id.toString() === userId)

    // console.log ( "me :" , me);
    // console.log("users : ", users);
    // console.log("result : ", allUsers);
    res.status(200).json({ users, me });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getWhatsAppData, Users, Name, About, Profile, userProfile, updateName, updateAbout, logout, sendUserId };
