import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"],
  },
  description: {
    type: String,
  },
  create_at: {
    type: Date,
    required: [true, "date required"],
  },
  duty_at: {
    type: Date,
    required: [true, "date required"],
  },
  status: {
    type: String,
    required: [true, "status required"],
  },
});

module.exports = mongoose.model("Task", taskSchema, "Tasks");
