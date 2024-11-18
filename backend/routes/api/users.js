const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../../controllers/usersController");
const userAnswersController = require("../../controllers/userAnswersController")

router.route("/").get(usersController.getAllUsers);
router.route("/").post(usersController.createUser);
router.route("/:id/answers/:index").get(userAnswersController.getAnswer);
router.route("/:id/answers/:index").post(userAnswersController.createAnswer);

module.exports = router;
