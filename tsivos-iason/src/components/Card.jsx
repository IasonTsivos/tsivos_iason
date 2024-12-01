// src/components/Card.jsx
import React from 'react';
import './Card.css'; // Assuming you'll create a separate CSS file for card styling
import linkedinIcon from "../assets/icons/linkedin.svg";
import github from "../assets/icons/github.svg";
import profileImage from "../assets/icons/prof.png"; // Import the profile image

const Card = () => {
  return (
    <div className="fixed-card">
      {/* Image */}
      <div className="card-img">
        <img src={profileImage} alt="Tsivos Iason" className="profile-img" />
      </div>

      {/* Name */}
      <h2 className="card-name">TSIVOS IASON</h2>

      {/* Description */}
      <p className="card-description">
        Computer and Software Engineer, passionate about technology and solving problems.
      </p>

      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="GitHub" className="social-icon" />
        </a>
      </div>
    </div>
  );
};

export default Card;
