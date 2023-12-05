import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './routes/HomePage';
import UpdateRestaurantPage from './routes/UpdateRestaurantPage';
import BusinessPage from './routes/BusinessPage';

const App = ()=> {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/restaurants/:id" element={<BusinessPage/>}/>        
        <Route exact path="/restaurants/:id/update"element={<UpdateRestaurantPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
