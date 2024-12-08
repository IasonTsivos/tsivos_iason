import React from "react";
import "./WorkSectionCard.css";

const WorkSectionCard = ({ image, title, description, link }) => {
  const handleRedirect = () => {
    window.open(link, "_blank"); // Opens the link in a new tab
  };

  return (
    <div className="work-card" onClick={handleRedirect} style={{ cursor: "pointer" }}>
      {/* Top Section: Image and Title */}
      <div className="work-card-top">
        <img src={image} alt={title} className="work-card-image" />
        <h2 className="work-card-title">{title}</h2>
      </div>

      {/* Bottom Section: Description */}
      <div className="work-card-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default WorkSectionCard;
