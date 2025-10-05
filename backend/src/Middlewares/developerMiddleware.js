import jwt from "jsonwebtoken";
import Developer from "../Models/Developer.js";
import "dotenv/config";

export const developerMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const verified = jwt.verify(token, process.env.MY_SECRET_TOKEN);
    if (!verified || !verified.userId) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const dev = await Developer.findById(verified.userId);
    if (!dev) {
      return res.status(403).json({ message: "Only developers can access this route" });
    }

    req.developer = dev; 
    next();  

  } catch (error) {
    console.error(error.stack);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
