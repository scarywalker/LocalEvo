import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((review) => {
        return (
          <div
            key={review.review_id}
            className="card text-white bg-primary mb-3 mr-4 text-center"
            style={{ maxWidth: "42%", minWidth: "30%" }}
          >
            <div className="card-header d-flex justify-content-between flex-column">
              <span>{review.user_name}</span>
              <span>{<StarRating rating={review.rating} />}</span>
            </div>
            <div className="car-body">
              <p className="card-text">{review.review_text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
