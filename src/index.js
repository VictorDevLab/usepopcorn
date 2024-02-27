import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

function Test() {
  const [songRating, setSongRating] = useState(0);
  return (
    <div>
      <StarRating maxRating={10} color="green" onSetRating={setSongRating} />
      <p>You rated this song {songRating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      className="test"
      messages={["terrible", "bad", "average", "good", "exellent"]}
    />
    <StarRating size={24} color="red" defaultRating={2} />
    <Test />
  </React.StrictMode>
);
