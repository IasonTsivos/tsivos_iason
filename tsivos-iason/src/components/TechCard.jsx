import React from "react";
import "./TechCard.css";

const TechCard = ({ icon, title, subtitle }) => {
  return (
    <div className="tech-card">
      <img src={icon} alt={title} className="tech-card-icon" />
      <div className="tech-card-text">
        <h3 className="tech-card-title">{title}</h3>
        <p className="tech-card-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default TechCard;
