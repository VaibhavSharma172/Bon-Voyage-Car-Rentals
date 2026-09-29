import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId;

        if(!userId){
            return res.status(401).json({success: false, message: "not authorized"})
        }
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "not authorized"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "not authorized"})
    }
}