import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";
import { ownerOnly } from "../middleware/owner.js";

const ownerRouter = express.Router();

ownerRouter.post("/add-car", protect, ownerOnly, upload.single("image"), addCar)
ownerRouter.get("/cars", protect, ownerOnly, getOwnerCars)
ownerRouter.post("/toggle-car", protect, ownerOnly, toggleCarAvailability)
ownerRouter.post("/delete-car", protect, ownerOnly, deleteCar)
ownerRouter.get('/dashboard', protect, ownerOnly, getDashboardData)
ownerRouter.post('/update-image', protect, ownerOnly, upload.single("image"), updateUserImage)

ownerRouter.post("/change-role", protect, changeRoleToOwner)

export default ownerRouter;