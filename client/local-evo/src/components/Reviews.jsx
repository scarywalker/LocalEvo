import React from "react";
import StarRating from "./StarRating";

const Reviews = () => {
  return (
    <div className="row row-cols-3 mb-2">
      <div
        className="card text-white bg-primary mb-3 mr-4 text-center"
        style={{ maxWidth: "42%", minWidth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between flex-column">
          <span>avestruz</span>
          <span>{<StarRating rating={2} />}</span>
        </div>
        <div className="car-body">
          <p className="card-text">Me likes it</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
