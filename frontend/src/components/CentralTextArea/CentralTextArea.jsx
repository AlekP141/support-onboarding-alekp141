import { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../App";
import RenderMessage from "./RenderMessage/RenderMessage";
import HintGenerator from "./Hints/HintGenerator";
import { useParams } from "react-router-dom";
import axios from "axios";

export const CentralTextArea = () => {
  const [question] = useContext(QuestionContext);
  const [replyType, setReplyType] = useState("support");
  const [userMessages, setUserMessages] = useState([]);
  const { userID, questionIndex } = useParams();

  useEffect(() => {
    const getUserMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userID}/answers/${questionIndex}`);
        const data = Array.isArray(res.data) ? res.data : [];
        setUserMessages([...data]);
      } catch (error) {
        console.error("Error fetching user messages:", error);
        setUserMessages([]);
      }
    };

    getUserMessages();
  }, [questionIndex, userID]);


  const handleReplyType = (e) => {
    setReplyType(e.target.value);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const message = {
      sender: replyType,
      text: e.target.replyArea.value,
    };

    const uploadMessage = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/users/${userID}/answers/${questionIndex}`, message);
        setUserMessages([...userMessages, message]);
        e.target.replyArea.value = "";
      } catch (error) {
        console.error(error);
      }
    };
    uploadMessage();
  };

  return (
    <div className="text-area-structure">
      <div className="text-area-header">
        <div className="ta-header-title">{question?.title}</div>
        <div className="ta-header-sla">
          <div className="ta-header-sla-count">{Math.floor(Math.random() * 5 + 2)}d</div>
          <div className="ta-header-web-form">Via web form</div>
        </div>
      </div>
      <div className="text-area-container">
        {question?.messages.map((message, index) => (
          <RenderMessage key={`${question}-${index}`} message={message}></RenderMessage>
        ))}
        {userMessages.map((message, index) => (
          <RenderMessage key={`userMessage-${index}`} message={message}></RenderMessage>
        ))}
      </div>
      <div className={`text-area-reply ${replyType}`}>
        <div className="text-area-reply-header">
          <div className="tar-header-lhs">
            <select name="reply-type" onChange={handleReplyType}>
              <option value="support">Public reply</option>
              <option value="support-internal">Internal note</option>
            </select>
            {replyType === "support" ? <div className="tar-header-recipients">{question?.customer}</div> : null}
          </div>
          <div className="tar-header-rhs">
            <HintGenerator {...{ userMessages, setUserMessages }} />
          </div>
        </div>
        <form id="submit-text-form" onSubmit={handleSubmitMessage}>
          <textarea name="replyArea"></textarea>
        </form>
      </div>
    </div>
  );
};
