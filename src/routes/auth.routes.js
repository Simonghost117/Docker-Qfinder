import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register",
  validateSchema(registerSchema),
  register
);

router.post("/login",
  validateSchema(loginSchema),
  login
);

router.get("/verify",
  verifyToken,
  (req, res) => res.status(200).json({ user: req.user })
);

router.post("/logout",
  verifyToken,
  logout
);

export default router;