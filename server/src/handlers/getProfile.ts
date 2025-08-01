import { Request, Response } from "express";
import User, { IUser } from "../database/models/user";

const getProfile = async (req: Request, res: Response) => {
  const { _id } = (req as Request & { user: IUser }).user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.json({ user: response });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default getProfile;
