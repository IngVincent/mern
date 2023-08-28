import { Router } from 'express'
import { login, register, logout, profile } from '../controllers/auth.controller.js';
import { authRequired } from '../middleware/validateToken.js';
import { validateSchema } from '../middleware/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router()

//Login 
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

//User
//el middleware validateToken solo deja acceder en la ruta a usrs logeados
router.get("/profile", authRequired, profile);


export default router