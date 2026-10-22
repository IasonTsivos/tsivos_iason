import "./SkillsSection.css";
import SectionHeading from "./SectionHeading";
import DriftWall from "./reactbits/DriftWall/DriftWall";
import azure from "../assets/icons/azure-2.svg";
import cpp from "../assets/icons/cpp_logo.svg";
import react from "../assets/icons/react-2.svg";
import arduino from "../assets/icons/arduino-1.svg";
import androidStudio from "../assets/icons/android-studio.svg";
import python from "../assets/icons/python-5.svg";
import unreal from "../assets/icons/unreal-1.svg";
import firebase from "../assets/icons/Firebase.svg";
import css from "../assets/icons/css-3.svg";
import javascript from "../assets/icons/logo-javascript.svg";
import git from "../assets/icons/git.png";

const skills = [
  { image: azure, title: "Azure", subtitle: "Cloud computing" },
  { image: cpp, title: "C++", subtitle: "Programming language" },
  { image: react, title: "React", subtitle: "UI library" },
  { image: arduino, title: "Arduino", subtitle: "Hardware & software" },
  { image: python, title: "Python", subtitle: "Programming language" },
  { image: androidStudio, title: "Android Studio", subtitle: "Android IDE" },
  { image: firebase, title: "Firebase", subtitle: "Development platform" },
  { image: unreal, title: "Unreal Engine", subtitle: "Game engine" },
  { image: javascript, title: "JavaScript", subtitle: "Web language" },
  { image: css, title: "CSS", subtitle: "Style sheets" },
  { image: git, title: "Git", subtitle: "Version control" },
];

// Logo tiles drifting on a tilted wall; hovering a tile lifts it out and stops its column
const SkillsSection = () => (
  <section id="skills" className="skills-section">
    <SectionHeading label="Skills" title="Tech stack" subtitle="languages, tools and platforms" />

    <div className="skills-wall">
      <DriftWall
        items={skills}
        captions
        columns={5}
        tileWidth={220}
        tileHeight={146}
        gap={20}
        tilt={16}
        turn={-8}
        perspective={1200}
        depth={120}
        speed={36}
        direction="up"
        variance={0.45}
        parallax={0.6}
        lift={64}
        fade={0.35}
        dim={0.9}
        overlayColor="#000000"
      />
    </div>
  </section>
);

export default SkillsSection;
