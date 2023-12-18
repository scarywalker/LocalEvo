import React from "react";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";
import Navbar from "../components/Navbar";

function MyRestaurantsPage() {
  return (
    <div>
      <Navbar />
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
}

export default MyRestaurantsPage;
