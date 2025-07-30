import mongoose, { Document } from "mongoose";
const { Schema } = mongoose;
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  validatePassword(password: string): Promise<boolean>;
  getJwtToken(): string;
}
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [30, "Name must be less than 30 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [32, "Password must be less than 32 characters long"],
      validate(value: string) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (password: string) {
  const user = this as IUser;
  const hashedPassword = user.password;

  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};

userSchema.methods.getJwtToken = function () {
  const user = this as IUser;
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
export { IUser };
