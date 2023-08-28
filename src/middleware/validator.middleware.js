export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(400)
            .json({ error: error.errors.map((error) => error.message) });
        //esta linea obtiene el arreglo de errores zod y lo recorremos con un map para encontrar los errores y enviarlos al frontend
    }
};