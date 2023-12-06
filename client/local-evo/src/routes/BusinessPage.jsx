import React from "react";
import { useParams } from "react-router-dom";
import Business from "../components/Business";

function BusinessPage() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-center">update</h1>
      <Business id={id} />
    </div>
  );
}

export default BusinessPage;
