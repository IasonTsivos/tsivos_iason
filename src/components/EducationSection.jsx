import React from 'react';
import './EducationSection.css';
import pada from "../assets/icons/pada.png";
import link from "../assets/icons/external-link.svg";

const EducationSection = () => {
  const handleRedirect = (url) => {
    window.open(`https://${url}`, "_blank"); // Opens link in a new tab
  };

  return (
    <section id="education" className="education-section">
      <h1 className="bold-h1">Integrated</h1>
      <h1 className="bold-h2">MASTER</h1>

      {/* Image and Text Section */}
      <div className="image-text-section">
        {/* Left side: Image */}
        <div className="image-container">
          <img 
            src={pada}
            alt="Education" 
            className="section-image" 
          />
        </div>

        {/* Right side: Text */}
        <div className="text-container">
          <h1 className="line1">University of West Attica</h1>
          <h2 className="line2">Masters Degree in Informatics and Computer Engineering</h2>
          <img
            src={link} 
            alt="link"
            className="social-icon"
            onClick={() => handleRedirect('ice.uniwa.gr')}
          />
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
