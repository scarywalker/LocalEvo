import React from "react";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";
import Navbar from "../components/Navbar";

function MyRestaurantsPage() {
  return (
    <div>
      <Navbar />
      <h1 className="text-4xl text-center">Your Restaurants</h1>
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
}

export default MyRestaurantsPage;
