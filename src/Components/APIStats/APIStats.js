import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoServices from "../../Services/TodoServices";

const APIStats = () => {
  const [apiCounts, setApiCounts] = useState([]);

  useEffect(() => {
    TodoServices.apiCountUpdate()
      .then((res) => {
        console.log(res.data.count.count);
        setApiCounts(res?.data?.count?.count);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log("apiCount update", apiCounts);

  return (
    <div>
      <h2>API Access Counts: {apiCounts}</h2>
     
    </div>
  );
};

export default APIStats;
