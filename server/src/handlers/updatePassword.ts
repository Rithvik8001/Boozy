import { Request, Response } from "express";
import User, { IUser } from "../database/models/user";
import bcrypt from "bcrypt";

interface IUpdatePassword {
  updatedPassword: string;
}

const updatePassword = async (req: Request, res: Response) => {
  const { _id } = (req as Request & { user: IUser }).user;
  const { updatedPassword } = req.body as IUpdatePassword;
  const notValidFields = Object.keys(req.body).filter(
    (field) => !["updatedPassword"].includes(field)
  );
  if (notValidFields.length > 0) {
    return res.status(400).json({ message: "Invalid fields" });
  }
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await user.validatePassword(updatedPassword);
    if (isPasswordValid) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password",
      });
    }
    const hashedPassword = await bcrypt.hash(updatedPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default updatePassword;
