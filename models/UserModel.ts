import mongoose, { Document, Schema } from "mongoose";

import bcrypt from "bcrypt";

interface User extends Document {
  name?: string;
  email: string;
  password?: string;
  provider: "credentials" | "google" | "github";
  authUserId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "github"],
      required: true,
    },
    authUserId: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (this.password) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});

const User =
  mongoose.models.User<User> ?? mongoose.model<User>("User", userSchema);

export default User;
