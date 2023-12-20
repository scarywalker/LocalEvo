import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";

function AddRestaurant() {
  const { addRestaurants } = useContext(RestaurantContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [type, setType] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        id: userId,
        name,
        location,
        type,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurant);
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <div className="m-4">
      <form action="">
        <div className="form-control">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="input input-bordered input-sm mb-2"
              placeholder="name"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="input input-bordered input-sm mb-2"
              placeholder="location"
            />
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              type="text"
              className="input input-bordered input-sm mb-2"
              placeholder="cusine"
            />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="select select-bordered select-sm mb-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-outline btn-success btn-sm"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
