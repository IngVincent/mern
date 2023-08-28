import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js"
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { validateSchema } from '../middleware/validator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router()

//rutas del crud 
router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, updateTask);
//Fin rutas del crud

export default router