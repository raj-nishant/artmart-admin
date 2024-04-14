import React from "react";
import "./ScrollingBanner.css"; // Ensure CSS is properly linked

const offers = [
  "Special Offer! Get 30% off on your first purchase!",
  "Free shipping on orders over $50!",
  "Sign up for our newsletter and get 10% off.",
];

const ScrollingBanner = () => {
  return (
    <div className="scrolling-banner bg-slate-200 text-black">
      <div className="scroll-container">
        {/* Repeat the array to avoid empty space at the end */}
        {[...offers, ...offers].map((offer, index) => (
          <div key={index} className="scroll-text">
            {offer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
