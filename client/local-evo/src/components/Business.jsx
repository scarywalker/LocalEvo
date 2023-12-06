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
        <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
            <AddReview />
          </div>
        </>
      )}
    </div>
  );
}

export default Business;
