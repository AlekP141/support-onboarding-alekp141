const express = require("express");
const router = express.Router();
const path = require("path");
const questionsController = require("../../controllers/questionsController");

router.route("/").get(questionsController.getAllQuestions);
router.route("/:index").get(questionsController.getQuestion);

module.exports = router;
