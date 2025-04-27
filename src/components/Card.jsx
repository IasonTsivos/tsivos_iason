import React from "react";
import "./Card.css";
import githubIcon from "../assets/icons/github.svg";
import li from "../assets/icons/linkedin.svg";
import prf from "../assets/icons/prof1.jpg";
import ins from "../assets/icons/instagram.svg";
import mp from "../assets/icons/map-pin.svg";
import user from "../assets/icons/user.svg";
import info from "../assets/icons/info.svg";

const Card = () => {
  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="card">
      {/* Top Section */}
      <div className="card-top">
        <img
          src={prf} // Replace with your profile picture path
          alt="Profile"
          className="profile-pic"
        />
      </div>

      {/* Bottom Section */}
      <div className="card-bottom">
        {/* Icon and Text (Flex-Start) */}
        <div className="location-info">
          <img src={user} alt="Location Icon" className="location-icon" />
          <span className="location-text">Tsivos Iason</span>
        </div>
        <div className="location-info">
          <img src={info} alt="Location Icon" className="location-icon" />
          <span className="location-text">Computer & Software Engineer</span>
        </div>
        <div className="location-info">
          <img src={mp} alt="Location Icon" className="location-icon" />
          <span className="location-text">Located in Athens, Greece</span>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <img
            src={li}
            alt="LinkedIn"
            className="social-icon"
            onClick={() =>
              handleRedirect("https://www.linkedin.com/in/iasonas-tsivos-1b32b61b9/")
            }
          />
          <img
            src={githubIcon}
            alt="GitHub"
            className="social-icon"
            onClick={() => handleRedirect("https://github.com/IasonTsivos")}
          />
          <img
            src={ins}
            alt="Instagram"
            className="social-icon"
            onClick={() => handleRedirect("https://www.instagram.com/iaswnas_/")}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
