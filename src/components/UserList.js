import React, { useEffect, useState } from "react";
import Card from "./Card";
import PaginationOutlined from "./PaginationOutlined";
import EmptyUsers from "./EmptyUsers";
import DenseAppBar from "./DenseAppBar";

const UserList = ({ userList, setUserList, loading, setLoading, pageNumber, setPageNumber, totalPage, setTotalPage, isEmpty, setIsEmpty }) => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredUsers, setFilteredUsers] = useState(userList);

  useEffect(() => {
    
    const filtered = userList.filter((user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setIsEmpty(filtered.length === 0); 
  }, [searchQuery, userList]);

  return (
    <>
      <div className="navigationbar">
       <DenseAppBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="userlist-container">

        {loading &&
          filteredUsers.map((item) => (
            <Card key={item.id} userInfo={item} setUserList={setUserList} />
          ))}

        {isEmpty && <EmptyUsers />}
        <div className="pageing">
          <PaginationOutlined
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            totalPage={totalPage}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
