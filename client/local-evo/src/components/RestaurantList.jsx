import React, { useContext, useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "./StarRating";
import { RestaurantContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function RestaurantList(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/user/${userId}`);
        setRestaurants(response.data.data.restaurant);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    try {
      navigate(`/restaurants/${id}/update`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => restaurant.restaurant_id !== id)
      );
    } catch (error) {
      console.log(error);
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
          <StarRating rating={restaurant.average_rating} />
          <span className="text-warning ml-1">({restaurant.review_count})</span>
        </>
      );
    }
  };

  return (
    <div className="">
      <table className="table table-xs md:table-sm">
        <thead>
          <tr className="text-center">
            <th scope="col">Name</th>
            <th scope="col">Locations</th>
            <th scope="col">Cuzine</th>
            <th scope="col">Price</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          ) : (
            restaurants.map((restaurant) => {
              return (
                <tr
                  className="hover text-center"
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
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.restaurant_id)}
                      className="btn btn-xs btn-outline btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.restaurant_id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
