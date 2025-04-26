import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">{children}</div>
  );
};

export default Card;
