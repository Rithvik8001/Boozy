import express, { Router } from "express";
import getTodos from "../handlers/getTodos";
import userAuth from "../middlewares/userAuth";

const router: Router = express.Router();

router.get("/api/todos/:id", userAuth, getTodos);

export default router;
