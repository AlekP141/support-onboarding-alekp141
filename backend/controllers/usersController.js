const path = require("path");
const fsPromises = require("fs").promises;

const data = {
  userAnswers: require("../models/userAnswers.json"),
  setUserAnswers: function (data) {
    this.userAnswers = data;
  },
};

const getUsersArray = () => {
  return data.userAnswers.map((userAnswer) => {
    return { id: userAnswer.id, user: userAnswer.user };
  });
};

const getAllUsers = (req, res) => {
  const users = getUsersArray();
  res.json(users);
};

const createUser = async (req, res) => {
  const user = req.body.name;

  const isDuplicate = data.userAnswers.some(
    (userAnswer) => userAnswer.user.toLowerCase() === user.toLowerCase()
  );

  if (isDuplicate) {
    return res.status(409).json({ message: "User name already exists" });
  }

  const questionData = require("../models/questions.json");
  const questionList = questionData.map((question) => question.indexName);

  const answers = Object.fromEntries(
    questionList.map((question) => [question, []]),
  );

  const newUser = {
    id: data.userAnswers?.length ? data.userAnswers[data.userAnswers.length - 1].id + 1 : 1,
    user,
    answers,
  };

  try {
    const filePath = path.join(__dirname, "..", "models", "userAnswers.json");
    const fileData = await fsPromises.readFile(filePath, "utf-8");

    const usersArray = JSON.parse(fileData);
    usersArray.push(newUser);

    await fsPromises.writeFile(filePath, JSON.stringify(usersArray, null, 1));

    data.setUserAnswers(usersArray);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

module.exports = { getAllUsers, createUser };
