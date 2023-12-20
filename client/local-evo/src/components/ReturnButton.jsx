import React from "react";
import { useNavigate } from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-outline btn-sm btn-warning"
    >
      Return
    </button>
  );
};

export default ReturnButton;
