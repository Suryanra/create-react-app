import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const EditUser = ({ setUserList }) => {
  const { id } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate();

  const userInfo = location.state?.userInfo || {};

  const [formData, setFormData] = useState({
    first_name: userInfo.first_name || "",
    last_name: userInfo.last_name || "",
    email: userInfo.email || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const base_url = process.env.REACT_APP_BASE_URL; 
      const url = `${base_url}api/users/${id}`; 
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const updatedUser = await response.json(); 
      // console.log("User updated successfully:", updatedUser);
      toast("User Updated ✅")

      
      setUserList((prevList) =>
        prevList.map((user) => {
          // console.log("Processing user:", user); 
          if (user.id === parseInt(id, 10)) { 
            // console.log("Match found, updating user:", { ...user, ...formData }); 
            return { ...user, ...formData }; 
          }
          // console.log("No match, keeping user unchanged:", user); 
          return user;
        })
      );

      
      // console.log("Updated user list after save:", formData);

      
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="edit-user">
      <h1>Edit User</h1>
      <form>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSave} className="btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUser;
