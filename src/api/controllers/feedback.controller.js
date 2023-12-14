import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Feedbacks } from "../modals/feedback.model.js";
import ErrorHandler from "../utils/errorHandle.js";

class HandleFeedbacks {
  static addFeedback = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    const file = req.file;

    const sampleData = {
      forms: [
        {
          ...data,
          file: file.filename,
        },
      ],
    };

    const doc = await Feedbacks.create(sampleData);
    await doc.save();
    res.json({ success: true, message: "successfully added." });
  });

  static allFeedback = catchAsyncError(async (req, res, next) => {
    const docs = await Feedbacks.find({});

    if (!docs) {
      return next(new ErrorHandler("No feedback found.", 200));
    }
    res.json({ success: true, docs });
  });
}

export default HandleFeedbacks;
