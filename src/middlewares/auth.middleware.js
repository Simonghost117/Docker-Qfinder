import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import User from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: "Acceso denegado: No se proporcionó token" 
      });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: "Usuario no encontrado" 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: "Token inválido o expirado" 
    });
  }
};