import React, { useState } from "react";
import ReviewFinder from "../apis/ReviewFinder";
import { useParams, useNavigate } from "react-router-dom";
import ReturnButton from "./ReturnButton";

const AddReview = () => {
  const { id } = useParams();
  const [rating, setRating] = useState("Rating");
  const [review, setReview] = useState("");
  const userId = localStorage.getItem("userId");
  let navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlwSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === "Rating" || !review) {
      alert("Please fill in both the rating and review fields.");
      return;
    }
    try {
      setIsSubmitting(true);
      await ReviewFinder.post(`/${id}/add-review`, {
        userId,
        review,
        rating,
      });
    } catch (error) {
      console.log("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
      navigate(-1);
    }
  };

  return (
    <form className="form-control m-6" action="">
      <label className="label" htmlFor="rating">
        Rating
      </label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        id="rating"
        className="select select-bordered select-sm mb-2"
        required
      >
        <option disabled>Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label htmlFor="review">Review</label>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Your review here..."
        id="review"
        className="textarea textarea-bordered textarea-sm leading-relaxed h-32"
        required
      ></textarea>
      <button
        onClick={handlwSubmitReview}
        type="submit"
        className="btn btn-outline btn-sm btn-primary mt-8"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <ReturnButton/>
    </form>
  );
};

export default AddReview;
