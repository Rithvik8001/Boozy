import { Request, Response } from "express";
import Todo from "../database/models/todos";
import { IUser } from "../database/models/user";

const getTodos = async (req: Request, res: Response) => {
  const { user } = req as Request & { user: IUser };
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = Math.max(1, Number(page));
  const limitNumber = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNumber - 1) * limitNumber;
  try {
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const todos = await Todo.find({ user: user._id })
      .populate("user", "email")
      .skip(skip)
      .limit(limitNumber);
    if (todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }
    res.status(200).json({
      message: "Todos fetched successfully",
      data: todos,
      total: todos.length,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    console.error("Error getting todos:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to get todos",
    });
  }
};

export default getTodos;
