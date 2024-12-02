import React from "react";
import "./Card.css";
import profileImage from "../assets/icons/prof.png"; // Import the profile image
import linkedinIcon from "../assets/icons/linkedin.svg"; // Import the LinkedIn SVG
import githubIcon from "../assets/icons/github.svg"; // Import the GitHub SVG

const ProfileCard = () => {
  return (
    <div className="profile-card">
      {/* Top Half: Profile Image */}
      <div className="profile-image-section">
        <img src={profileImage} alt="Tsivos Iason" className="profile-img" />
      </div>

      {/* Bottom Half: Background with Text and Buttons */}
      <div className="card-content">
        <div className="card-text">
          <h2>Tsivos Iason</h2>
        </div>

        {/* Social Media Buttons */}
        <div className="social-buttons">
          <a
            href="https://www.linkedin.com/in/iasonas-tsivos-1b32b61b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          <a
            href="https://github.com/IasonTsivos"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <img src={githubIcon} alt="GitHub" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
