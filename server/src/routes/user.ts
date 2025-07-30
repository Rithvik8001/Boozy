import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../handlers/user";
const router: Router = Router();

router.post("/api/auth/register", registerUser);
router.post("/api/auth/login", loginUser);
router.post("/api/auth/logout", logoutUser);

export default router;
