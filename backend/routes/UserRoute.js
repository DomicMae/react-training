import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUser,
} from "../controllers/UserController.js";

const router = Router();

router.get("/user", getUser);
router.post("/user/add", createUser);
router.delete("/user/remove/:id", deleteUserById);

export default router;
