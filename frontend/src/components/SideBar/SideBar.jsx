import { useContext } from "react";
import { QuestionContext } from "../../App";
import { APPLICATION_ID } from "../consts";

export const SideBar = () => {
  const [question] = useContext(QuestionContext);

  return (
    <div className="side-bar-container">
      <div className="app-involved-container">
        <div className="aiic-requester">
          <label htmlFor="requester-select">Requester</label>
          <select name="requester-select">
            <option value={question?.customer}>{question?.customer}</option>
          </select>
        </div>
        <div className="aiic-assignee">
          <label htmlFor="assignee-select">Assignee*</label>
          <select name="asignee-select">
            <option value="DSEs">DSEs</option>
          </select>
        </div>
        <div className="aiic-followers">
          <label htmlFor="followers-select">Followers</label>
          <select name="followers-select">
            <option value=""></option>
          </select>
        </div>
      </div>
      <div className="app-info">
        <div className="app-id">
          <label htmlFor="app-id-area">Application ID</label>
          <textarea name="app-id-area" value={APPLICATION_ID} readOnly></textarea>
        </div>
        <div className="app-index">
          <label htmlFor="app-index-area">Index Name</label>
          <textarea name="app-index-area" value={question?.indexName || "Loading"} readOnly></textarea>
        </div>
      </div>
    </div>
  );
};
