import React from "react";
import WorkSectionCard from "./WorkSectionCard";
import im1 from "../assets/icons/avitron.png";
import im2 from "../assets/icons/utg.png";
import im3 from "../assets/icons/podimatas.png";
import im4 from "../assets/icons/prcompany.png";
import im5 from "../assets/icons/tempo.png";

const workItems = [
    {
      image: im1,
      title: "Avitron - Event Production",
      description: "Event Equipment Installation Assistant",
      link: "https://www.avitron.gr", // Replace with the actual link
    },
    {
      image: im2,
      title: "United Technical Group",
      description: "LED Screen Technician",
      link: "https://www.utg-greece.com", // Replace with the actual link
    },
    {
      image: im3,
      title: "Podimatas Group",
      description: "Conference Organization Assistant",
      link: "https://www.podimatas.gr ", // Replace with the actual link
    },
    {
      image: im5,
      title: "Tempo Events",
      description: "Audiovisual Technician",
      link: "https://tempoevents.gr", // Replace with the actual link
    },
    {
      image: im4,
      title: "Projector Company",
      description: "Live-Stream Operator",
      link: "https://projector-web.gr/gr/home", // Replace with the actual link
    },
  ];
  

const WorkSection = () => {
    return (
      <section id="work" style={{ padding: '50px' }}>
        <h1 className="bold-h1">WORK</h1>
        <h1 className="bold-h2">EXPERIENCE</h1>
        <section className="work-section">
          {workItems.map((item, index) => (
            <WorkSectionCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              link={item.link} // Pass the link
            />
          ))}
        </section>
      </section>
    );
  };
  

export default WorkSection;
