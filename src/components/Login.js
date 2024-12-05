import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/users");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const LoginHandle = async () => {
    // console.log(userDetails, process.env.REACT_APP_BASE_URL);
    const base_url = process.env.REACT_APP_BASE_URL;
    const url = base_url + "api/login";
    

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    

    if (response.ok && result.token) {
      // console.log("Login successful", result);
      localStorage.setItem("authToken", result.token);
      toast.success("Login Successful");
      navigate("/users");
    } else {
      // console.error("Login failed", result);
      toast.error("Invalid credentials! ❌");
    }
  };

  return (
    <div className="app-container">
      <div className="login-form-container">
        <div>
          <div>Login </div>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={userDetails.email}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="*****"
              value={userDetails.password}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className="submit-btn-div">
          <span className="btn" onClick={LoginHandle}>Submit</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
