import express from "express";
import HandleQuestions from "../controllers/question.controller.js";

const router = express.Router();

router.route("/add").post(HandleQuestions.AddNewQuestion);
router.route("/all").get(HandleQuestions.AllQuestions);

router.route("/:id").get(HandleQuestions.FindQueById);

router.route("/:id").delete(HandleQuestions.DeleteQuestion);
router.route("/:id").put(HandleQuestions.UpdateQuestion);

export default router;
