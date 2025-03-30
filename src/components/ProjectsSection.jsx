import React from 'react';
import './ProjectsSection.css';
import CardComponent from './CardComponent';

// Import your images
import image1 from "../assets/icons/oil1.jpg";
import image2 from "../assets/icons/vr.png";
import image3 from "../assets/icons/image3.png";

const ProjectsSection = () => {
  // Array of project data
  const projects = [
    {
      image: image1,
      title: "Application of IOT Technology and Cloud Computing for the Automation of Olive Oil Production Processes",
      subtitle: "Master's Thesis",
      link: "https://polynoe.lib.uniwa.gr/xmlui/handle/11400/6238?locale-attribute=en",
    },
    {
      image: image3,
      title: "Reactive Architectural Website",
      subtitle: "React & CSS Project",
      link: "https://visualization.gr",
    },
    {
      image: image2,
      title: "Virtual Reality Museum with interactive exhibits & Programmed Guide",
      subtitle: "Unreal Engine Project",
      link: "https://drive.google.com/file/d/1Nd4L8OseKRtJt_NO_mIQ8gHU0xXWOHt4/view?usp=sharing",
    },
    
  ];

  return (
    <section id="projects" className="projects-section">
      <h1 className="bold-h1">RECENT</h1>
      <h1 className="bold-h2">PROJECTS</h1>

      {/* Cards Container */}
      <div className="card-grid">
        {projects.map((project, index) => (
          <CardComponent
            key={index}
            image={project.image}
            title={project.title}
            subtitle={project.subtitle}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
