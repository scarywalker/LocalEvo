import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewFinder from "../apis/ReviewFinder";
import ReturnButton from "./ReturnButton";

const UpdateReview = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [text, setText] = useState("");
  const [rating, setRating] = useState("Rating");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReviewFinder.get(`/update/${id}`);
        setText(response.data.data.reviews[0].review_text);
        setRating(response.data.data.reviews[0].rating);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ReviewFinder.put(`/${id}`, {
        text,
        rating,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center">Update Review</h1>
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
          <option value="Rating" disabled>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="review">Review</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your review here..."
          id="review"
          className="textarea textarea-bordered textarea-sm leading-relaxed h-32"
          required
        ></textarea>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-outline btn-sm btn-primary my-6"
        >
          Submit
        </button>
        <ReturnButton />
      </form>{" "}
    </div>
  );
};

export default UpdateReview;
