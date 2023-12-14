import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    forms: [],
  },
  { timestamps: true }
);

export const Feedbacks = mongoose.model("Feedback", FeedbackSchema);
