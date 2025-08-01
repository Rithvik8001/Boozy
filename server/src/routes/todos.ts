import express, { Router } from "express";
import getTodos from "../handlers/getTodos";
import userAuth from "../middlewares/userAuth";
import addTodo from "../handlers/addTodo";
const router: Router = express.Router();

router.get("/api/todos", userAuth, getTodos);
router.post("/api/todos/add", userAuth, addTodo);

export default router;
