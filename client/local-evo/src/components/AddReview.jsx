import React, { useState } from "react";
import ReviewFinder from "../apis/ReviewFinder";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const [rating, setRating] = useState("Rating");
  const [review, setReview] = useState("");
  const userId = localStorage.getItem("userId");

  const handlwSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await ReviewFinder.post(`/${id}/add-review`, {
        userId,
        review,
        rating,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            id="review"
            className="form-control"
          ></textarea>
        </div>
        <button
          onClick={handlwSubmitReview}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
