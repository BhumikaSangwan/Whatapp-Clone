import jwt from "jsonwebtoken";

const SECRET_KEY = "login-key";

const authMiddleware = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        console.log("No token found in cookies");
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            req.user = decoded;
            next();
        }
    });
};

export default authMiddleware;
