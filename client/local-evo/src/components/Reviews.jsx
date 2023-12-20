import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import ReviewFinder from "../apis/ReviewFinder";
import { useNavigate } from "react-router-dom";

const Reviews = ({ reviews }) => {
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    setReviewList(reviews);
  }, [reviews]);

  const handleDelete = async (e, id) => {
    try {
      await ReviewFinder.delete(`/${id}`);
      setReviewList(reviewList.filter((review) => review.review_id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      {reviewList.map((review) => {
        return (
          <div
            key={review.review_id}
            className="card bg-base-100 border-2 border-slate-800 rounded-md shadow-md m-8"
          >
            <div className="card-body">
              <h2 className="card-title">
                {review.user_name || review.restaurant_name}{" "}
                <span>{<StarRating rating={review.rating} />}</span>
              </h2>
              <p>{review.review_text}</p>
              <div
                className={`card-actions justify-between ${
                  review.user_id !== localStorage.userId && "hidden"
                }`}
              >
                <button
                  onClick={() => navigate(`/reviews/${review.review_id}`)}
                  className="btn btn-warning btn-outline btn-sm"
                >
                  Update
                </button>{" "}
                <button
                  onClick={(e) => handleDelete(e, review.review_id)}
                  className="btn btn-error btn-outline btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
