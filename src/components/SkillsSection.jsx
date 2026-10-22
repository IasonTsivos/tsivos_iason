import "./SkillsSection.css";
import SectionHeading from "./SectionHeading";
import DriftWall from "./reactbits/DriftWall/DriftWall";
import useIsMobile from "../utils/useIsMobile";
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

// Desktop: a wide wall of large tiles. Phones: three narrow columns sized to fit the screen,
// a gentler angle and lighter edge fade, and no pointer-follow tilt (there is no hover on touch).
const WALL = {
  desktop: { columns: 5, tileWidth: 220, tileHeight: 146, gap: 20, tilt: 16, turn: -8, parallax: 0.6, fade: 0.35 },
  mobile: { columns: 3, tileWidth: 104, tileHeight: 76, gap: 10, tilt: 12, turn: -4, parallax: 0, fade: 0.2 },
};

// Logo tiles drifting on a tilted wall; hovering a tile lifts it out and stops its column
const SkillsSection = () => {
  const wall = useIsMobile() ? WALL.mobile : WALL.desktop;

  return (
    <section id="skills" className="skills-section">
      <SectionHeading label="Skills" title="Tech stack" subtitle="languages, tools and platforms" />

      <div className="skills-wall">
        <DriftWall
          items={skills}
          captions
          {...wall}
          perspective={1200}
          depth={120}
          speed={36}
          direction="up"
          variance={0.45}
          lift={64}
          dim={0.9}
          overlayColor="#000000"
        />
      </div>
    </section>
  );
};

export default SkillsSection;
