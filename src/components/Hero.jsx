import { useEffect, useState } from "react";
import "./Hero.css";
import Badge from "./Badge/Badge";
import FoldText from "./reactbits/FoldText/FoldText";
import RotatingText from "./reactbits/RotatingText/RotatingText";
import CountUp from "./reactbits/CountUp/CountUp";

const stats = [
  { value: 7, label: "Years of experience" },
  { value: 4, label: "Companies trust" },
  { value: 20, label: "Worldwide clients" },
];

const building = ["cloud solutions", "VR environments", "automation", "web apps"];

const HEADLINE_SIZE = "clamp(1.75rem, 3.4vw, 1rem)";

const MOBILE_QUERY = "(max-width: 768px)";

const useIsMobile = () => {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setMobile(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return mobile;
};

const Hero = () => {
  const mobile = useIsMobile();

  return (
    <header id="home" className="hero">
      {/* Badge sits behind the text; the text layer lets pointer events through to it */}
      <div className="hero-badge">
        <Badge anchor={mobile ? "center" : "right"} />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">Tsivos Iason — Rotterdam, Netherlands</p>

        <h1 className="hero-title">
          <FoldText
            text="Computer & Software Engineer"
            fontSize={HEADLINE_SIZE}
            fontWeight={600}
            color="var(--text)"
            stagger={0.02}
            duration={0.55}
          />
        </h1>

        <p className="hero-building" style={{ fontSize: HEADLINE_SIZE }}>
          building{" "}
          <RotatingText
            texts={building}
            rotationInterval={2800}
            staggerDuration={0.015}
            animatePresenceMode="popLayout"
            mainClassName="hero-rotating"
          />
        </p>

        <p className="hero-text">
          Tech enthusiast with love for learning and growing in the IT space. I enjoy tackling
          challenging problems and learning new technologies to enhance my skills. My curiosity
          drives me to constantly explore emerging trends, from cloud computing to coding, I strive
          to integrate them into practical solutions. From working on automating processes to
          creating VR environments, I’m driven by the belief that technology can solve real-world
          problems and transform the way we live and work.
        </p>

        <dl className="hero-stats">
          {stats.map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <dt className="hero-stat-label">{label}</dt>
              <dd className="hero-stat-value">
                <CountUp to={value} duration={1.6} suffix="+" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
};

export default Hero;
