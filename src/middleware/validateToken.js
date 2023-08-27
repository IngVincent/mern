import jwt from 'jsonwebtoken'; //libreria de token para comparar que sea tkn valido 
import { TOKEN_SECRET } from '../config.js' //importamos el token secreto

export const authRequired = (req, res, next) => {
    //console.log(req.headers); //obtiene el request header con la cookie
    //const token = req.headers.cookie; //obtiene todas las cookies
    //const cookies = req.cookies;//obtiene solo la cookie
    //console.log(cookies); //imprime la cookie
    const { token } = req.cookies //obtiene la cookie separada en objetos
    console.log("imprime token navegador ", { token }); //imprime cookie
    console.log("imprime token secreto: ", { TOKEN_SECRET });


    //////////////Condicion middleware
    if (!token)
        return res.status(401).json({ message: "No token,autoriztion denied" });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        // console.log("el id del usuario es: ", user);

        req.user = user;
        console.log("el req.user = ", req.user);

        console.log("pasaste el middleware");
        next();
    })
    //////////////Fin Condicion middleware


    //console.log("pasaste el middleware sin que el token sirviera");
    //next()
};
