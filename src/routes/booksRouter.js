import { Router } from "express";
import bookController from "../controllers/bookController.js";

const router = Router();

router.get("/:id", bookController.getBookById);
router.get("", bookController.getAllBooks);

router.post("", bookController.createBook);
router.put("/:id", bookController.updateBookById);

router.delete("/:id", bookController.deleteBookById);

export default router;
