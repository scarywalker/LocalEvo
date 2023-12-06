import React from "react";
import { useParams } from "react-router-dom";
import Business from "../components/Business";

function BusinessPage() {
  const { id } = useParams();
  return (
    <div>
      <Business id={id} />
    </div>
  );
}

export default BusinessPage;
