import React, { useEffect, useState } from "react";
import ReviewFinder from "../apis/ReviewFinder";
import Reviews from "./Reviews";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReviewFinder.get(`/${localStorage.userId}`);
        setReviews(response.data.data.reviews)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <Reviews reviews={reviews} />
    </div>
  );
};

export default MyReviews;
