import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationOutlined({ setPageNumber, pageNumber,totalPage }) {
  const [page, setPage] = useState(pageNumber);

  const handleChange = (event, value) => {
    setPage(value); 
    setPageNumber(value); 
  };

  return (
    <Stack spacing={2}>
      <Pagination 
        count={totalPage} 
        variant="outlined" 
        page={page} 
        onChange={handleChange} 
        color="secondary" 
      />
    </Stack>
  );
}
