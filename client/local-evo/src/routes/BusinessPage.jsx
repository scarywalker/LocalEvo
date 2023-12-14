import React from "react";
import { useParams } from "react-router-dom";
import Business from "../components/Business";
import Navbar from "../components/Navbar"

function BusinessPage() {
  const { id } = useParams();
  return (
    <div>
      <Navbar/>
      <Business id={id} />
    </div>
  );
}

export default BusinessPage;
