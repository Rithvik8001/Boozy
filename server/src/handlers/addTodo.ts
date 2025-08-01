import { Request, Response } from "express";
import Todo from "../database/models/todos";
import User, { IUser } from "../database/models/user";
import validator from "validator";

interface TodoData {
  title: string;
  description: string;
  date?: Date;
}
const addTodo = async (req: Request, res: Response) => {
  const { _id } = (req as Request & { user: IUser }).user;
  const { title, description, date } = req.body;
  const allowedFields = ["title", "description", "date"];
  const invalidFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    });
  }
  if (validator.isEmpty(title) || validator.isEmpty(description)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const todoData: TodoData = {
      title,
      description,
      date: date ? new Date(date) : new Date(),
    };
    const response = await Todo.create({ ...todoData, user: _id });
    res.status(201).json({
      message: "Todo created successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to add todo",
    });
  }
};

export default addTodo;
