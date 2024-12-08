import React from 'react';
import './Navbar.css';
import Home from "../assets/icons/home.svg";
import Grad from "../assets/icons/grad.svg";
import Code from "../assets/icons/code.svg";
import bc from "../assets/icons/briefcase.svg";
import tools from "../assets/icons/tools.svg";

const Navbar = () => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };

  return (
    <div className="navbar">
      <div className="nav-item" onClick={() => handleScroll('home')}>
        <img src={Home} alt="Home Icon" className="nav-icon" />
        <span className="nav-title">Home</span>
      </div>
      <div className="nav-item" onClick={() => handleScroll('education')}>
        <img src={Grad} alt="Graduation Icon" className="nav-icon" />
        <span className="nav-title">Education</span>
      </div>
      <div className="nav-item" onClick={() => handleScroll('projects')}>
        <img src={Code} alt="Code Icon" className="nav-icon" />
        <span className="nav-title">Projects</span>
      </div>
      <div className="nav-item" onClick={() => handleScroll('work')}>
        <img src={bc} alt="Briefcase Icon" className="nav-icon" />
        <span className="nav-title">Work</span>
      </div>
      <div className="nav-item" onClick={() => handleScroll('skills')}>
        <img src={tools} alt="Tools Icon" className="nav-icon" />
        <span className="nav-title">Skills</span>
      </div>
    </div>
  );
};

export default Navbar;
