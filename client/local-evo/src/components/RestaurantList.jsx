import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "./StarRating";
import { RestaurantContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";

function RestaurantList(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurant);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    try {
      navigate(`/restaurants/${id}/update`);
    } catch (error) {}
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.restaurant_id !== id));
    } catch (error) {}
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
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Locations</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.restaurant_id)}
                  key={restaurant.restaurant_id}
                >
                  <td>{restaurant.restaurant_name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.restaurant_id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.restaurant_id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
