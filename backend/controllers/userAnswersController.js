const path = require("path");
const fsPromises = require("fs").promises;

const data = {
  userAnswers: require("../models/userAnswers.json"),
  setUserAnswers: function (data) {
    this.userAnswers = data;
  },
};

// const getAllAnswers = (req, res) => {
//   res.json( data.userAnswers );
// };

const getAnswer = (req, res) => {
  const { id, index } = req.params;

  const user = data.userAnswers.find((user) => user.id == id);
  if (!user) return res.status(400).json({ message: "User not found" });

  const answer = user.answers[index];
  res.status(200).json(answer);
};


const createAnswer = async (req, res) => {
  const { id, index } = req.params;
  const newAnswer = req.body;

  const userAnswersPath = path.join(__dirname, "..", "models", "userAnswers.json");
  const questionsPath = path.join(__dirname, "..", "models", "questions.json");

  try {
    const fileData = JSON.parse(await fsPromises.readFile(userAnswersPath, "utf-8"));
    const questionsData = JSON.parse(await fsPromises.readFile(questionsPath, "utf-8"));

    // verify the user exists
    const user = fileData.find((user) => user.id == id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check the index exists in questions.json
    const validIndex = questionsData.some((question) => question.indexName === index);
    if (!validIndex) {
      return res.status(400).json({ message: `Invalid question index: ${index}` });
    }

    // check the answers array for the question index exists in the user's answers. If it doesnt, initialise it
    if (!Array.isArray(user.answers[index])) {
      user.answers[index] = [];
    }

    user.answers[index].push(newAnswer);

    await fsPromises.writeFile(
      userAnswersPath,
      JSON.stringify(fileData, null, 2),
      "utf-8"
    );

    data.setUserAnswers(fileData);

    res.status(201).json({ message: "Answer created successfully" });
  } catch (error) {
    console.error("Error updating answers:", error);
    res.status(500).json({ message: "Failed to create answer" });
  }
};


module.exports = { getAnswer, createAnswer };
