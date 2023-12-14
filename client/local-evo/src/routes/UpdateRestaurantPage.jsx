import React from "react";
import UpdateRestaurant from "../components/UpdateRestaurant";
import Navbar from "../components/Navbar";

function UpdateRestaurantPage() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Update</h1>
      <UpdateRestaurant />
    </div>
  );
}

export default UpdateRestaurantPage;
