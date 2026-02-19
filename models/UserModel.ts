import mongoose, { Document, Schema } from "mongoose";

import bcrypt from "bcrypt";

enum Role {
  admin = "admin",
  user = "user",
}

interface User extends Document {
  name?: string;
  email: string;
  password?: string;
  provider: "credentials" | "google" | "github";
  authUserId?: string;
  savedEvents: mongoose.Types.ObjectId[];
  role: Role;
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
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.user,
    },
    savedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
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
