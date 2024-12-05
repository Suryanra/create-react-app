import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const Card = ({ userInfo, handleUpdateUser, setUserList }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    setUserList((prevList) => prevList.filter(user => user.id !== userInfo.id));
    toast.success("🗑️ user deleted successfully ")
  };

  const handleEdit = () => {
    navigate(`/edit-user/${userInfo.id}`, {
      state: { userInfo, handleUpdateUser },
    });
  };

  return (
    <div className="card">
      <div className="image">
        <img
          src={userInfo.avatar}
          alt={`${userInfo.first_name} ${userInfo.last_name}`}
        />
      </div>
      <div className="details">
        <div>{userInfo.first_name}</div>
        <div>{userInfo.email}</div>
      </div>

      <div className="edit-delete-btn-container">
        <div className="edit-delete-btn" onClick={handleEdit}>
          Edit
        </div>
        <div className="edit-delete-btn" onClick={handleDelete}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default Card;
