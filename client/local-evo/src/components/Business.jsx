import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";
import StarRating from "./StarRating";
import Reviews from "./Reviews";
import AddReview from "./AddReview";

function Business({ id }) {
  const { selectedRestaurant, setSelectedResturant } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedResturant(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center text-2xl">
            {selectedRestaurant.restaurant.restaurant_name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
              ({selectedRestaurant.restaurant.review_count || 0})
            </span>
          </div>
          <div className="mt-3">
            {selectedRestaurant.restaurant.user_id !== localStorage.userId && <AddReview />}
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
        </>
      )}
    </div>
  );
}

export default Business;
