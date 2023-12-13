import React, { useState, createContext } from "react";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedResturant] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedResturant,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};
