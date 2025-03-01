import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './connection.js'
import authRouter from './router/auth.js'
import whatsappRouter from './router/whatsapp.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 9000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB('mongodb://localhost:27017/Whatsapp')
.then(() => {
    console.log("MongoDB started");
}) 
.catch( (err) => {
    console.log("MongoDB failed to start");
})

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"]             
}));
app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    console.log("Origin:", req.headers.origin);
    next();
});

app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.json());
app.use(express.urlencoded ({extended : false}));


app.get("/", (req, res) => res.send("Hello World!"));
app.use('/users', authRouter);
app.use('/whatsapp', whatsappRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));