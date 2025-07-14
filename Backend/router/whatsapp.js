import express from "express";
import authMiddleware from "../middleware/auth.js";
import multer from 'multer';
import path from 'path';
import User from '../models/user.js'
import Messages from '../models/messageSchema.js'
import { getWhatsAppData, Users, Name, About, Profile, userProfile, updateName, updateAbout, logout, sendUserId } from "../controller/whatsapp.js";


const router = express.Router();

router.use(authMiddleware);

router.get("/", getWhatsAppData);
router.get("/users", Users)
router.get('/getName', Name);
router.get('/getAbout', About);
router.get('/getProfile', Profile);
router.get('/getUserProfile', userProfile);
router.post('/updateAbout', updateAbout);
router.post('/updateName', updateName);
router.post('/logout', logout);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'profilePic') {
            cb(null, 'uploads/profile');
        }
        else if (file.fieldname === 'status') {
            cb(null, 'uploads/status');
        }
        else if (file.fieldname === 'messages') {
            cb(null, 'uploads/messages');
        }
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + name + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("Invalid file type"), false);
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: fileFilter
});

router.post('/uploadProfile', upload.single('profilePic'), async (req, res) => {
    try {
        console.log("upload profile request handled");
        console.log("file : ", req.file)
        const userId = req.user.userId;
        const user = await User.findOneAndUpdate({ _id: userId }, { dp: req.file.path }, { new: true });
        res.status(200).json({ message: "File uploaded successfully", dp: user.dp });
    } catch (err) {
        console.error("Error fetching user profile:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/imageMsg', upload.single('messages'), async (req, res) => {
    try {
        console.log("upload image request handled");
        console.log("file : ", req.file);
        const { senderId, receiverId, createdAtFormatted } = req.body;
        const newMessage = new Messages({ senderId, receiverId, text: null, image: `/uploads/messages/${req.file.filename}`, createdAtFormatted });
        await newMessage.save();

        res.status(200).json({ message: "File uploaded successfully", image: `/uploads/messages/${req.file.filename}` });
    }
    catch (err) {
        console.error("Error fetching user profile:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
export default router;