import express from "express";
import multer from "multer";
import path from "path";
import HandleFeedbacks from "../controllers/feedback.controller";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.route("/add").post(upload.single("file"), HandleFeedbacks.addFeedback);
router.route("/all").get(HandleFeedbacks.allFeedback);

export default router;
