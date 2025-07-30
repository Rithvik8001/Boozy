import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../database/models/user";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = decoded as { id: string };
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    (req as Request & { user: IUser }).user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "Failed to authenticate",
    });
  }
};

export default userAuth;
