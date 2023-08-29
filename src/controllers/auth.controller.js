import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

import { token } from 'morgan';

export const register = async (req, res) => {
    const { email, password, username } = req.body
    //console.log(email, password, username)

    try {
        //comprueba que el usr no exista
        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(["This email already exists"]);
        //se hashea la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);


        const newUser = new User(
            {
                username,
                email,
                password: passwordHash,
            });
        // probar el objeto que se envia al backend
        //console.log(newUser);
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id })
        //Generando el Token

        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    }
    catch (error) {
        //catch envia el error al frontend, en caso de existir
        res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body
    //console.log(email, password)

    try {
        //busca ccorreo
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "user not found" });

        //compara contraseña hasheada con la contraseña hasheada del usuario registrado

        const isMatch = await bcryptjs.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid Credential" });
        //Generando el Token
        const token = await createAccessToken({ id: userFound._id })


        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    }
    catch (error) {
        //catch envia el error al frontend, en caso de existir
        res.status(500).json({ message: error.message });
    }
};
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    console.log("desde la ruta profile imprime el req.user del midleware: ", req.user)
    //consulta a la bd
    //const userFound = User.findById(res.user) //busca por medio del id el user recibio de la cookie
    const userFound = await User.findById(req.user.id); //obtiene el usuario en el objeto userFound
    // console.log("el id del user es: ", userFound._id) // imprime el id del usr de userFound
    if (!userFound) return res.status(400).json({ message: ['The mail already in use'] });
    //fin de la consulta

    //envio de datos 
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
    //fin envio de datos
    res.send('profile')
}




