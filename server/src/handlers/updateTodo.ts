import { Request, Response } from "express";
import Todo from "../database/models/todos";
import User, { IUser } from "../database/models/user";
import validator from "validator";

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { _id } = (req as Request & { user: IUser }).user;
  const { title, description, date, isCompleted } = req.body;
  const allowedFields = ["title", "description", "date", "isCompleted"];
  const invalidFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );
  if (invalidFields.length > 0) {
    return res.status(400).json({ message: "Invalid fields" });
  }
  if (title && validator.isEmpty(title)) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (description && validator.isEmpty(description)) {
    return res.status(400).json({ message: "Description is required" });
  }
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== _id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
      date,
      isCompleted,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updateTodo;
