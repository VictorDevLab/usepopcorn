import React, { useEffect } from "react";

const Practice = () => {
  const BASE_URL = "example-url";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      //do sth with data
      console.log(data);
    };
    fetchData();
  }, []);
  return <div> practice hjgfdhofv hello hsdgud</div>;
};

export default Practice;
