import React, { useContext, useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "./StarRating";
import { RestaurantContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";

const Seacrh = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const [query, setQuery] = useState("");
  let navigate = useNavigate();

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.get(`/search/${query}`);
      setRestaurants(response.data.data.restaurants);
      console.log(response);
      console.log(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.review_count) {
      return <span className="text-warning">0 reviews</span>;
    } else {
      return (
        <>
          <StarRating rating={restaurant.id} />
          <span className="text-warning ml-1">({restaurant.review_count})</span>
        </>
      );
    }
  };

  return (
    <>
      <div className="container text-center">
        <h1 className="my-5">Search</h1>
        <form className="d-flex my-4">
          <input
            type="text"
            name="query"
            placeholder="Enter search . . ."
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={(e) => onSubmitSearch(e)}
            type="submit"
            className="btn btn-success"
          >
            Search
          </button>
        </form>
      </div>
      <div className="list-group">
        <table className="table table-hover table-dark ">
          <thead>
            <tr className="bg-primary">
              <th scope="col">Restaurant</th>
              <th scope="col">Locations</th>
              <th scope="col">Cuzine</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    onClick={() =>
                      handleRestaurantSelect(restaurant.restaurant_id)
                    }
                    key={restaurant.restaurant_id}
                  >
                    <td>{restaurant.restaurant_name}</td>
                    <td>{restaurant.location}</td>
                    <td>{restaurant.cosine_type}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>{renderRating(restaurant)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Seacrh;
