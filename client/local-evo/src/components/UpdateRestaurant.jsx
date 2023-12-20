import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";
import ReturnButton from "./ReturnButton";

function UpdateRestaurant() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [cosineType, setCosineType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.restaurant_name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
        setCosineType(response.data.data.restaurant.cosine_type);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        type: cosineType,
        price_range: priceRange,
      });
      navigate("/restaurants");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center">Update</h1>
      <form className="form-control m-8" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          className="input input-bordered input-sm mb-2"
          type="text"
        />
        <label htmlFor="location">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          className="input input-bordered input-sm mb-2"
          type="text"
        />
        <label htmlFor="cosine">Cosine Type</label>
        <input
          value={cosineType}
          onChange={(e) => setCosineType(e.target.value)}
          id="cosine"
          className="input input-bordered input-sm mb-2"
          type="text"
        />
        <label htmlFor="price_range">Price Range</label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="select select-bordered select-sm mb-2"
        >
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
        </select>
        <button
          type="submit"
          className="btn btn-outline btn-sm btn-primary mt-6"
        >
          Submit
        </button>
        <ReturnButton/>
      </form>
    </div>
  );
}

export default UpdateRestaurant;
