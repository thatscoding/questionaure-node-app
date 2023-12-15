import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Questions } from "../modals/question.model.js";
import ErrorHandler from "../utils/errorHandle.js";

class HandleQuestions {
  static AddNewQuestion = catchAsyncError(async (req, res, next) => {
    console.log(req.body);
    let data = {
      title: req.body.QueName,
      options: req.body.options,
      answer: req.body.answer,
      type: req.body.QueType,
      required: req.body.QueRequired,
      order: req.body.QueSequence,
    };
    const doc = await Questions.create(data);
    res.json({ success: true, message: "successfully registered." });
  });

  static AllQuestions = catchAsyncError(async (req, res, next) => {
    const docs = await Questions.find({});

    if (!docs) {
      return next(new ErrorHandler("No user found.", 200));
    }
    res.json({ success: true, docs });
  });

  static UpdateQuestion = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    const doc = await Questions.findOne({ _id: id });

    let data = {
      title: (req.body.QueName || doc.title).toLowerCase(),
      options: req.body.options || doc.options,
      answer: req.body.answer || "",
      type: req.body.QueType || doc.type,
      required: req.body.QueRequired || doc.required,
      order: req.body.QueSequence || doc.order,
    };

    // console.log(id);
    // console.log(data);

    const updatedQuestion = await Questions.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      updatedQuestion,
    });
  });

  static FindQueById = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
      return next(new ErrorHandler("Id is required.", 400));
    }
    const doc = await Questions.findOne({ _id: id });

    res.json({ success: true, doc });
  });

  static DeleteQuestion = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
      return next(new ErrorHandler("Id is required.", 400));
    }
    const docs = await Questions.deleteOne({ _id: id });

    res.json({ success: true, docs });
  });
}

export default HandleQuestions;
