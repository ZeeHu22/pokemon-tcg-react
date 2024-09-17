import React from "react";

const SkeletonCard = () => {
  // Array of 8 items for 8 skeleton cards
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="skeleton-container">
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-img"></div>
          <div className="skeleton-text"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
