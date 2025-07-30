import express, { Router } from "express";
import getTodos from "../handlers/getTodos";
const router: Router = express.Router();

router.get("/api/todos/:id", getTodos);

export default router;
