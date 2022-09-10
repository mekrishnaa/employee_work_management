import express from "express";
import {
  createTask,
  getAllTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/task.js";
import { verifyToken, verifyEmployee} from "../utils/verifyToken.js";

const router = express.Router();


router.post("/", createTask);
// router.get("/:id",verifyEmployee, getTask);
router.delete("/:id", deleteTask);
router.put("/:id",updateTask),
router.get("/alltask",getTask);
router.get("/",getAllTask);

export default router;
