import express, { Router } from "express";
import userAuth from "../middlewares/userAuth";
import getProfile from "../handlers/getProfile";
import updatePassword from "../handlers/updatePassword";

const router: Router = express.Router();

router.get("/api/profile", userAuth, getProfile);
router.post("/api/profile/update/password", userAuth, updatePassword);

export default router;
