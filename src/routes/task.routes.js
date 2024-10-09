import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
const router = Router();

router.get("/", authRequired, getTasks);
router.get("/:id", authRequired, getTask);
router.post("/", authRequired, validateSchema(createTaskSchema), createTask);
router.delete("/:id", authRequired, deleteTask);
router.put("/:id", authRequired, updateTask);

export default router;
 