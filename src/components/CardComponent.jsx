import React from "react";
import "./CardComponent.css";
import xlink from "../assets/icons/external-link.svg"

const CardComponent = ({ image, title, subtitle, link }) => {
  const handleRedirect = () => {
    window.open(link, "_blank");
  };

  return (
    <div className="card-container">
      {/* Left Section: Image */}
      <div className="card-image">
        <img src={image} alt="Template Preview" />
      </div>

      {/* Right Section: Text and Icon */}
      <div className="card-content">
        <h1 className="card-title">{title}</h1>
        <p className="card-subtitle">{subtitle}</p>
      </div>

      {/* External Link Icon */}
      <div className="card-link" onClick={handleRedirect}>
        <img src={xlink} />
      </div>
    </div>
  );
};

export default CardComponent;
