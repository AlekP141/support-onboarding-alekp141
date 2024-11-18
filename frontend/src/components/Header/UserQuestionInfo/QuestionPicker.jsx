import { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../../App";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const QuestionPicker = () => {
  const [question, setQuestion] = useContext(QuestionContext);
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userID, questionIndex } = useParams();

  // fetch question list on load
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/questions`);
        setQuestionList(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // set question based on URL
  useEffect(() => {
    if (questionList.length > 0) {
      const questionOnLoad = questionList.find((q) => q.indexName === questionIndex);

      if (questionOnLoad) {
        setQuestion(questionOnLoad);
      } else {
        console.error("Question not found:", questionIndex);
        setQuestion(questionList[0])
      }
    }
  }, [questionList, questionIndex, setQuestion]);


  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    const newTopic = name === "topic" ? value : question.topic;
    let newQuestionNumber = name === "questionNumber" ? value : question.questionNumber;

    // check that the selected question number exists for the topic, or set it to 1
    const availableQuestionNumbers = questionList.filter((q) => q.topic === newTopic).map((q) => q.questionNumber);
    if (!availableQuestionNumbers.includes(newQuestionNumber)) {
      newQuestionNumber = availableQuestionNumbers[0];
    }

    const newQuestion = questionList.find((q) => q.topic === newTopic && q.questionNumber === newQuestionNumber);

    if (newQuestion) {
      setQuestion(newQuestion);
      navigate(`/user/${userID}/question/${newQuestion.indexName}`);
    } else {
      console.error("Question not found:", newTopic, newQuestionNumber);
    }
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  const topics = [...new Set(questionList.map((q) => q.topic))];
  const questionNumbers = questionList.filter((q) => q.topic === question?.topic).map((q) => q.questionNumber);

  return (
    <div className="question-section flex-group">
      <p>Question:</p>
      <form className="question-picker">
        <select name="topic" id="select-topic" value={question?.topic || ""} onChange={handleQuestionChange}>
          {topics.map((topicOption) => (
            <option key={topicOption} value={topicOption}>
              {topicOption}
            </option>
          ))}
        </select>

        <select name="questionNumber" id="select-question-number" value={question?.questionNumber || ""} onChange={handleQuestionChange}>
          {questionNumbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default QuestionPicker;
