import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";


function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="restaurant-container">
        <div className="header-container">
            <h2 className="nearby-heading">Nearby Restaurants</h2>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
            <div
                key={restaurant.id}
                className="card"
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
                <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="image"
                />
                <h3 className="name">{restaurant.name}</h3>
                <p className="address">{restaurant.address}</p>
                <p className="distance">{restaurant.distance}</p>
                <p className="rating">⭐ {restaurant.rating}</p>
            </div>
            ))}
        </div>
    </div>
  );
}

export default RestaurantList;
