import React from "react";
import "../index.css";
const Card = ({ ele }) => {
  return (
    <div className="product-card">

      <div className="product-image-container">
        <img
          src={ele.thumbnail}
          alt={ele.title}
          className="product-image"
        />

        <span className="discount-badge">
          -{Math.round(ele.discountPercentage)}%
        </span>
      </div>

      <div className="product-content">

        <span className="product-category">
          {ele.category}
        </span>

        <h2 className="product-title">
          {ele.title}
        </h2>

        <p className="product-description">
          {ele.description}
        </p>

        <div className="product-rating">
          <span>★</span>
          {ele.rating}
          <span className="reviews">
            ({ele.stock} available)
          </span>
        </div>

        <div className="product-bottom">

          <div className="price">
            ₹{ele.price}
          </div>

          <button className="view-button">
            View
          </button>

        </div>

      </div>
    </div>
  );
};

export default Card;