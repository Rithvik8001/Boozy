import express, { Router } from "express";
import getTodos from "../handlers/getTodos";
import userAuth from "../middlewares/userAuth";
import addTodo from "../handlers/addTodo";
import updateTodo from "../handlers/updateTodo";
import deleteTodo from "../handlers/deleteTodo";

const router: Router = express.Router();

router.get("/api/todos", userAuth, getTodos);
router.post("/api/todos/add", userAuth, addTodo);
router.put("/api/todos/update/:id", userAuth, updateTodo);
router.delete("/api/todos/delete/:id", userAuth, deleteTodo);

export default router;
