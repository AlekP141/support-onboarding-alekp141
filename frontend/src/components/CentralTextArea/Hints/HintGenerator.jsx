import axios from "axios";
import { QuestionContext } from "../../../App";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const HintGenerator = ({ userMessages, setUserMessages }) => {
  const [question] = useContext(QuestionContext);
  const {userID, questionIndex} = useParams();

  const availableHints = question?.hints || [];

  const currentHints = userMessages.filter((message) => message.sender === "hint");

  const generateHint = async() => {
    const nextHint = {
      sender: "hint",
      text: question.hints[currentHints.length],
    };
    await axios.post(`${import.meta.env.VITE_API_URL}/users/${userID}/answers/${questionIndex}`, nextHint);
    setUserMessages([...userMessages, nextHint]);
  };

  if (currentHints.length < availableHints.length) {
    return (
      <div className="hint-gen-area" onClick={generateHint}>
        Get Hint
      </div>
    );
  } else {
    return <></>;
  }
};

export default HintGenerator;
