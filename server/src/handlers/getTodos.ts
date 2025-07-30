import { Request, Response } from "express";
import Todo from "../database/models/todos";
import mongoose from "mongoose";

const getTodos = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const todos = await Todo.find({ user: id }).populate("user", "email");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to get todos" });
  }
};

export default getTodos;
