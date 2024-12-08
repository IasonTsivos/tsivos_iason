import React from "react";
import "./Contact.css";
import emailIcon from "../assets/icons/mail.svg"; // Email icon pathr
import linkedinIcon from "../assets/icons/linkedin.svg"; // LinkedIn icon path
import githubIcon from "../assets/icons/github.svg"; // GitHub icon path

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h1 className="bold-h1">LET'S WORK</h1>
      <h1 className="bold-h2">TOGETHER</h1>
      <p className="contact-description">
        I'm excited to collaborate and bring ideas to life! Feel free to reach out for opportunities, projects, or just a chat.
      </p>

      <div className="contact-links">
        <div className="contact-item">
          <img src={emailIcon} alt="Email" />
          <a href="mailto:iaswnas1o@gmail.com">Mail me</a>
        </div>
        <div className="contact-item">
          <img src={linkedinIcon} alt="LinkedIn" />
          <a href="https://www.linkedin.com/in/iasonas-tsivos-1b32b61b9/" target="_blank" rel="noopener noreferrer">
            LinkedIn Profile
          </a>
        </div>
        <div className="contact-item">
          <img src={githubIcon} alt="GitHub" />
          <a href="https://github.com/IasonTsivos" target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
        </div>
      </div>

      
    </section>
  );
};

export default Contact;
