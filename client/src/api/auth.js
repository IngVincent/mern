import axios from "axios";

const API = 'http://localhost:3000/api/';

// Envía una petición post a /register con los datos del usuario proporcionados
export const registerRequest = user => axios.post(`${API}/register`, user);
