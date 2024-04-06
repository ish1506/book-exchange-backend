import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);

router.post("", userController.createUser);

export default router;
