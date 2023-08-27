import { Router } from 'express'
import { login, register, logout, profile } from '../controllers/auth.controller.js';
import { authRequired } from '../middleware/validateToken.js';

const router = Router()

//Login 
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//User
//el middleware validateToken solo deja acceder en la ruta a usrs logeados
router.get("/profile", authRequired, profile);


export default router