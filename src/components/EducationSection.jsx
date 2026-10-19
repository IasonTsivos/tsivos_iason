import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EducationSection.css";
import SectionHeading from "./SectionHeading";
import Particles from "./reactbits/Particles/Particles";
import useInView from "../utils/useInView";
import pada from "../assets/icons/pada.png";
import azure from "../assets/icons/azure-2.svg";

gsap.registerPlugin(ScrollTrigger);

// Where on screen the progress line's tip sits; an entry lights up when its node crosses it
const PROGRESS_POINT = "top 60%";

const entries = [
  {
    kind: "Degree",
    logo: pada,
    large: true,
    logoAlt: "University of West Attica logo",
    title: "Integrated Master",
    detail: "Informatics and Computer Engineering · University of West Attica",
    link: { href: "https://ice.uniwa.gr", label: "ice.uniwa.gr" },
  },
  {
    kind: "Certification · AZ-900",
    logo: azure,
    logoAlt: "Microsoft Azure logo",
    title: "Microsoft Certified: Azure Fundamentals",
    detail: "Cloud concepts, Azure architecture and services, management and governance",
    link: {
      href: "https://learn.microsoft.com/en-us/users/87120345/credentials/7f5da3228bdc649e",
      label: "Verify credential",
    },
  },
];

const EducationSection = () => {
  const [ref, inView] = useInView({ threshold: 0.15 });
  // Reduced motion: skip the scroll effects and show every entry lit
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Scroll-driven timeline: the purple line grows with the scroll and each entry
  // lights up as the line reaches its node (and dims again when scrolling back up).
  useEffect(() => {
    const section = ref.current;
    if (!section || reduced) return undefined;

    const ctx = gsap.context(() => {
      const timeline = section.querySelector(".edu-timeline");

      // Start and end at the same screen point, so the line's tip tracks that point exactly
      gsap.fromTo(
        ".edu-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: timeline, start: PROGRESS_POINT, end: "bottom 60%", scrub: true },
        }
      );

      gsap.utils.toArray(".edu-entry").forEach((entry) => {
        ScrollTrigger.create({
          trigger: entry,
          start: PROGRESS_POINT,
          onEnter: () => entry.classList.add("is-active"),
          onLeaveBack: () => entry.classList.remove("is-active"),
        });
      });

      // Particles drift slower than the page for a bit of depth
      gsap.to(".edu-particles", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, [ref, reduced]);

  return (
    <section id="education" ref={ref} className={`education-section${inView ? " is-visible" : ""}${reduced ? " is-static" : ""}`}>
      {/* Mounted on first view so the particles' intro plays as the section scrolls in */}
      <div className="edu-particles" aria-hidden="true">
        {inView && (
          <Particles
            particleCount={600}
            particleSpread={12}
            speed={0.08}
            particleColors={["#ffffff", "#a855f7", "#71717a"]}
            particleBaseSize={100}
            glow={0.5}
            twinkle={0.4}
            moveParticlesOnHover
            particleHoverFactor={0.6}
            clickBurst={false}
          />
        )}
      </div>

      <div className="edu-inner">
        <SectionHeading label="Education" title="Integrated Master" subtitle="and Microsoft Azure certified" />

        <div className="edu-timeline">
          <span className="edu-track" aria-hidden="true">
            <span className="edu-progress" />
          </span>
          <ol className="edu-list">
            {entries.map(({ kind, logo, logoAlt, large, title, detail, link }) => (
              <li key={title} className="edu-entry">
                <span className="edu-node" aria-hidden="true" />
                <span className={`edu-logo${large ? " edu-logo--large" : ""}`}>
                  <img src={logo} alt={logoAlt} />
                </span>
                <div className="edu-body">
                  <p className="edu-kind">{kind}</p>
                  <h3 className="edu-title">{title}</h3>
                  <p className="edu-detail">{detail}</p>
                  <a className="edu-link" href={link.href} target="_blank" rel="noreferrer">
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
