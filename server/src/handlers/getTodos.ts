import { Request, Response } from "express";
import Todo from "../database/models/todos";
import { IUser } from "../database/models/user";

const getTodos = async (req: Request, res: Response) => {
  const { user } = req as Request & { user: IUser };
  try {
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const todos = await Todo.find({ user: user._id }).populate("user", "email");
    if (todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }
    res
      .status(200)
      .json({ message: "Todos fetched successfully", data: todos });
  } catch (error) {
    console.error("Error getting todos:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to get todos",
    });
  }
};

export default getTodos;
