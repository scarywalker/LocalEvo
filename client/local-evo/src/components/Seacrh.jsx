import React, { useContext, useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "./StarRating";
import { RestaurantContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Seacrh = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setRestaurants([]);
  }, []);

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const response = await RestaurantFinder.get(`/search/${query}`);
      setRestaurants(response.data.data.restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
    <>
      <div className="container text-center">
        <h1 className="my-5 text-4xl">Search</h1>
        <form className="d-flex my-4">
          <input
            type="text"
            name="query"
            placeholder="Enter search . . ."
            className="input input-bordered input-sm mb-2  mx-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={(e) => onSubmitSearch(e)}
            type="submit"
            className="btn btn-outline btn-sm btn-success"
          >
            Search
          </button>
        </form>
      </div>
      <div className="">
        <table className="table table-xs md:table-sm">
          <thead>
            <tr className="text-center">
              <th scope="col">Name</th>
              <th scope="col">Locations</th>
              <th scope="col">Cuzine</th>
              <th scope="col">Price</th>
              <th scope="col">Ratings</th>
            </tr>
          </thead>
          <tbody>
            {loading && submitted ? (
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            ) : (
              restaurants.map((restaurant) => {
                if (restaurant.user_id !== localStorage.userId)
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
                    </tr>
                  );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Seacrh;
