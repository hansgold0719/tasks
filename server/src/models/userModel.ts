import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "User email required"],
  },
  password: {
    type: Number,
    required: [true, "password required"],
  },
});

module.exports = mongoose.model("User", userSchema, "Users");
