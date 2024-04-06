import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.post("/login", userController.loginUser);

router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);

router.post("", userController.createUser);

export default router;
