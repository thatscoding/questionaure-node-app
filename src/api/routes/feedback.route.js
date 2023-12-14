import express from "express";
import HandleFeedback from "../controllers/feedback.controller.js";
import multer from "multer";
import path from "path";
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

router.route("/add").post(upload.single("file"), HandleFeedback.addFeedback);
router.route("/all").get(HandleFeedback.allFeedbacks);

export default router;
