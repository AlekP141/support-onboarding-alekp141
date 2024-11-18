const data = {
  questions: require("../models/questions.json"),
  setQuestions: function (data) {
    this.questions = data;
  },
};

const getAllQuestions = (req, res) => {
  res.json(data.questions);
};

const getQuestion = (req, res) => {
  const question = data.questions.find((q) => q.indexName === req.params.index);
  if (!question) {
    return res
      .status(400)
      .json({ message: `question index ${req.params.index} not found` });
  }
  res.status(201).json(question);
};

module.exports = { getAllQuestions, getQuestion };
