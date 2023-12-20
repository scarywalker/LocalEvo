import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="">
      {reviews.map((review) => {
        return (
          <div className="card bg-base-100 border-2 border-slate-800 rounded-md shadow-md m-8">
            <div className="card-body">
              <h2 className="card-title">
                {review.user_name}{" "}
                <span>{<StarRating rating={review.rating} />}</span>
              </h2>
              <p>{review.review_text}</p>
              <div className={`card-actions justify-end ${review.user_id !== localStorage.userId && "hidden"}`}>
                <button className="btn btn-info btn-outline btn-sm">Update Review</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
