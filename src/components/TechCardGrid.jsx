import React from "react";
import "./TechCardGrid.css";
import TechCard from "./TechCard";

// Example icons (replace these with actual paths)
import az from "../assets/icons/azure-2.svg";
import cpp from "../assets/icons/cpp_logo.svg";
import react from "../assets/icons/react-2.svg";
import ard from "../assets/icons/arduino-1.svg";
import and from "../assets/icons/android-studio.svg";
import py from "../assets/icons/python-5.svg";
import ue from "../assets/icons/unreal-1.svg";
import frb from "../assets/icons/Firebase.svg";
import cs3 from "../assets/icons/css-3.svg";
import jsl from "../assets/icons/logo-javascript.svg";

const TechCardGrid = () => {
  const cards = [
    { icon: az, title: "Azure", subtitle: "Cloud Computing Services" },
    { icon: cpp, title: "C++", subtitle: "Programming Language" },
    { icon: react, title: "React", subtitle: "UI Library" },
    { icon: ard, title: "Arduino", subtitle: "Hardware & Software" },
    { icon: py, title: "Pyhton", subtitle: "Programming Language" },
    { icon: and, title: "Androind Studio", subtitle: "IDE for Android OS" },
    { icon: frb, title: "Firebase", subtitle: "Development Platform" },
    { icon: ue, title: "Unreal Engine", subtitle: "Graphics Game Engine" },
    { icon: jsl, title: "JavaScript", subtitle: "Web Programming Language" },
    { icon: cs3, title: "CSS", subtitle: "Style Sheet Language" },
];

  return (
    <div className="tech-card-grid">
      {cards.map((card, index) => (
        <TechCard
          key={index}
          icon={card.icon}
          title={card.title}
          subtitle={card.subtitle}
        />
      ))}
    </div>
  );
};

export default TechCardGrid;
