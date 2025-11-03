import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./index.css";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const imageRef = useRef();

  useEffect(() => {
    fetch("http://localhost:4000/restaurants")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === Number(id));
        setRestaurant(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching restaurant details:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleShare = async () => {
    try {
      const canvas = await html2canvas(imageRef.current);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      const file = new File([blob], "restaurant.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: restaurant.name,
          text: `Check out ${restaurant.name} on Fastor!`,
          files: [file],
        });
      } else {
        alert("Sharing not supported on this browser");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">Error: {error}</h2>;
  if (!restaurant) return <h2 className="error">Restaurant not found</h2>;

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <div className="image-container" ref={imageRef}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />
        <img
          src="/fastorlogo.png"
          alt="Fastor Logo"
          className="fastor-logo"
        />
      </div>

      <button className="share-button" onClick={handleShare}>
        Share Image
      </button>

      <h2 className="restaurant-name">{restaurant.name}</h2>
      <p className="restaurant-address">{restaurant.address}</p>
      <p className="restaurant-distance">{restaurant.distance}</p>
      <p className="restaurant-rating">⭐ {restaurant.rating}</p>
    </div>
  );
}

export default RestaurantDetails;
