import jwt from "jsonwebtoken";

const SECRET_KEY = "login-key";

const authMiddleware = (req, res, next) => {
  try {
    console.log("Middleware execution in WhatsApp route...");
    console.log("Cookie token:", req.cookies);

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
