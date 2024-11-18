import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../App";
import { useNavigate, useParams } from "react-router-dom";
// import createNewUser from "./createNewUser";

const SelectUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { userID, questionIndex } = useParams();
  const [modal, setModal] = useState(false);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Set currentUser based on initial URL load
  useEffect(() => {
    if (users.length > 0) {
      const userOnLoad = users.find((user) => user.id === Number(userID));
      setCurrentUser(userOnLoad);
    }
  }, [users, userID, setCurrentUser]);

  const handleUserChange = (e) => {
    const selectedUser = users.find((user) => user.id === Number(e.target.value));
    setCurrentUser(selectedUser);
    navigate(`/user/${selectedUser.id}/question/${questionIndex}`);
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    const newUser = e.target.newUser.value;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, { name: newUser });
      const createdUser = response.data;

      await fetchUserData();

      setCurrentUser(createdUser);
      navigate(`/user/${createdUser.id}/question/${questionIndex}`);

      toggleModal();
    } catch (error) {
      console.error("Error creating new user:", error);
    }
  };


  const toggleModal = () => {
    setModal(!modal);
  };

  if (loading) return <p>Loading Users...</p>;

  return (
    <>
      <div className="footer-user flex-group">
        <p>Select User:</p>
        <form className="select-user">
          <select id="users" value={currentUser?.id} onChange={handleUserChange}>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.user}
              </option>
            ))}
          </select>
        </form>
        <button className="create-new-user-button" onClick={toggleModal}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <p>Create New User</p>
            <form onSubmit={createNewUser} className="create-new-user-form">
              <input type="text" name="newUser" />
              <button type="submit">Create</button>
            </form>
            <p className="close-modal" onClick={toggleModal}>
              Close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectUser;
