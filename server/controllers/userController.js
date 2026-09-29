import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const userExists = await User.findOne({
            email: normalizedEmail,
        });

        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            token,
        });
    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id.toString());

        res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Get User data using Token (JWT)
export const getUserData = async (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
};

// Get All Cars for the Frontend
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({
            isAvailable: true,
        });

        res.json({
            success: true,
            cars,
        });
    } catch (error) {
        console.error("Get cars error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


// import User from "../models/User.js"
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import Car from "../models/Car.js";


// // Generate JWT Token
// const generateToken = (userId)=>{
//     return jwt.sign(
//         { userId },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" }
//     );
// };

// // Register User
// export const registerUser = async (req, res)=>{
//     try {
//         const {name, email, password} = req.body
// if (!name?.trim() || !email?.trim() || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         if (password.length < 8) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password must be at least 8 characters",
//             });
//         }

//         const normalizedEmail = email?.trim().toLowerCase();

//         if (!name || !email || !password) {
//     return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//     });
// }

// if (password.length < 8) {
//     return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters"
//     });
// }


//         const userExists = await User.findOne({email: normalizedEmail})
//         if(userExists){
//             return res.status(409).json({success: false, message: 'User already exists'})
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)
//         const user = await User.create({name: name.trim(), email: normalizedEmail, password: hashedPassword})
//         const token = generateToken(user._id.toString())
//         res.status(201).json({success: true, token})

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({success: false, message: error.message})
//     }
// }

// // Login User 
// export const loginUser = async (req, res)=>{
//     try {
//         const {email, password} = req.body
//         const normalizedEmail = email?.trim().toLowerCase();
//         const user = await User.findOne({email: normalizedEmail})
//         if(!user){
//             return res.status(401).json({success: false, message: "Invalid email or password" })
//         }
//         const isMatch = await bcrypt.compare(password, user.password)
//         if(!isMatch){
//             return res.status(401).json({success: false, message: "Invalid email or password" })
//         }
//         const token = generateToken(user._id.toString())
//         res.json({success: true, token})
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({success: false, message: error.message})
//     }
// }

// // Get User data using Token (JWT)
// export const getUserData = async (req, res) =>{
// res.json({
//         success: true,
//         user: req.user
//     });
// };

// // Get All Cars for the Frontend
// export const getCars = async (req, res) =>{
//     try {
//         const cars = await Car.find({isAvailable: true})
//         res.json({success: true, cars})
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({success: false, message: error.message})
//     }
// }

