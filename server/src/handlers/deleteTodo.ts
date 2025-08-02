import { Request, Response } from "express";
import User, { IUser } from "../database/models/user";
import Todo from "../database/models/todos";
import validator from "validator";

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { _id } = (req as Request & { user: IUser }).user;
  if (validator.isEmpty(id)) {
    return res.status(400).json({ message: "Todo ID is required" });
  }
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ message: "Invalid todo ID" });
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
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteTodo;
