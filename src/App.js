import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import EditUser from "./components/EditUser";

function App() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchUserList = async () => {
    const base_url = process.env.REACT_APP_BASE_URL;
    const url = base_url + `api/users?page=${pageNumber}`;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    setUserList(result.data);
    if (result.data.length == 0) {
      setIsEmpty(true);
    } else setIsEmpty(false);
    setTotalPage(result.total);
    setLoading(true);
  };

  useEffect(() => {
    fetchUserList();
  }, [pageNumber]);
  return (


      <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/users" element={<UserList isEmpty={isEmpty} setIsEmpty={setIsEmpty} pageNumber={pageNumber} setPageNumber={setPageNumber} userList={userList} setUserList={setUserList} totalPage={totalPage} setTotalPage={setTotalPage} loading={loading} setLoading={setLoading} />} />
         <Route path="/edit-user/:id" element={<EditUser setUserList={setUserList} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>);
}

export default App;
