import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    title: String,
    options: [],
    userAnswer: String,
    answer: String,
    type: String,
    required: String,
    order: String,
  },
  { timestamps: true }
);

export const Questions = mongoose.model("Questions", QuestionSchema);
