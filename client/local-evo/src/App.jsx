import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import UpdateRestaurantPage from "./routes/UpdateRestaurantPage";
import BusinessPage from "./routes/BusinessPage";
import DashboardPage from "./routes/DashboardPage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import { RestaurantContextProvider } from "./context/RestaurantContext";
const App = () => {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/restaurants/:id" element={<BusinessPage />} />
            <Route
              exact
              path="/restaurants/:id/update"
              element={<UpdateRestaurantPage />}
            />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
};

export default App;
