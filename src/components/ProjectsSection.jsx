import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsSection.css";
import SectionHeading from "./SectionHeading";
import MacWindow from "./mockups/MacWindow";
import IPhone from "./mockups/IPhone";
import VisionPro from "./mockups/VisionPro";
import ThesisCover from "./mockups/ThesisCover";
import LinkIcon from "./mockups/LinkIcon";
import TargetCursor from "./reactbits/TargetCursor/TargetCursor";
import DotOcean from "./backgrounds/DotOcean/DotOcean";
import useInView from "../utils/useInView";
import aspisVideo from "../assets/projects/aspisjiujitsu.mp4";
import greekAnalytics from "../assets/projects/greekanalytics.jpg";
import jasonsVision from "../assets/projects/jasonsvision.jpg";
import vrMuseum from "../assets/projects/vr.png";
import cakeHome from "../assets/projects/caketimehomescreen.png";
import cakeCreate from "../assets/projects/caketimecreate.png";
import cakeEdit from "../assets/projects/caketimeedit.png";
import cakeSettings from "../assets/projects/caketimesettings.png";
import pokedexHome from "../assets/projects/pokedexhomescreen.png";
import pokedexMain from "../assets/projects/pokedexmain.png";
import pokedexSearch from "../assets/projects/pokedexsearch.png";
import oilThesis from "../assets/projects/oil1.jpg";

gsap.registerPlugin(ScrollTrigger);

// frame: "mac" (website), "vision" (VR headset), "phone" (mobile app), "thesis" (research document)
// wide: the mockup spans the full row with the text above it
const projects = [
  {
    frame: "mac",
    wide: true,
    kind: "Web platform",
    title: "Aspis Jiu Jitsu",
    detail: "Platform for a Brazilian Jiu-Jitsu academy in Greece.",
    tags: ["Web platform"],
    video: aspisVideo,
    images: [{ alt: "Walkthrough of the Aspis Jiu Jitsu platform" }],
    url: "aspisjiujitsu.gr",
    link: { href: "https://aspisjiujitsu.gr", label: "Visit site" },
  },
  {
    frame: "mac",
    kind: "Website · TypeScript",
    title: "Greek Analytics",
    detail: "Analytics website built on Greek government and European open-data APIs.",
    tags: ["TypeScript", "Government APIs", "EU APIs"],
    images: [{ src: greekAnalytics, alt: "Greek Analytics home page" }],
    url: "greek-analytics.gr",
    link: { href: "https://greek-analytics.gr", label: "Visit site" },
  },
  {
    frame: "mac",
    kind: "Website · Go & TypeScript",
    title: "Jason's Vision",
    detail: "Sales platform for AI prompts, with a Go backend and a TypeScript storefront.",
    tags: ["Go", "TypeScript", "E-commerce"],
    images: [{ src: jasonsVision, alt: "Jason's Vision storefront" }],
    url: "jasonsvision.store",
    link: { href: "https://www.jasonsvision.store", label: "Visit site" },
  },
  {
    frame: "vision",
    kind: "Virtual Reality · Unreal Engine",
    title: "VR Museum",
    detail: "Virtual Reality museum with interactive exhibits and a programmed guide.",
    tags: ["Unreal Engine", "VR", "Blueprints"],
    images: [{ src: vrMuseum, alt: "Virtual Reality museum exhibit" }],
    link: {
      href: "https://drive.google.com/file/d/1Nd4L8OseKRtJt_NO_mIQ8gHU0xXWOHt4/view?usp=sharing",
      label: "Read paper",
    },
  },
  {
    frame: "phone",
    kind: "Mobile app",
    title: "CakeTime",
    detail: "Mobile app to create, edit and keep track of birthdays and celebrations.",
    tags: ["Mobile", "Android"],
    images: [
      { src: cakeHome, alt: "CakeTime home screen" },
      { src: cakeCreate, alt: "CakeTime create screen" },
      { src: cakeEdit, alt: "CakeTime edit screen" },
      { src: cakeSettings, alt: "CakeTime settings screen" },
    ],
    link: { href: "https://github.com/IasonTsivos/CakeTime", label: "GitHub" },
  },
  {
    frame: "phone",
    kind: "Mobile app",
    title: "Pokedex",
    detail: "Pokédex app to browse and search Pokémon with their details.",
    tags: ["Mobile", "REST API"],
    images: [
      { src: pokedexHome, alt: "Pokedex home screen" },
      { src: pokedexMain, alt: "Pokedex Pokémon details screen" },
      { src: pokedexSearch, alt: "Pokedex search screen" },
    ],
    link: { href: "https://github.com/IasonTsivos/Pokedex", label: "GitHub" },
  },
];

// Details from the record in Polynoe, the UNIWA repository
const thesis = {
  title: "Application of the Internet of Things and Cloud Computing Technologies for the Automation of Olive Oil Production Processes",
  author: "Iason Tsivos",
  supervisor: "Nikolaos Myridakis",
  date: "Athens · March 2024",
  abstract:
    "A system that monitors olive oil production in real time: temperature sensors across the production stages stream readings to the cloud, so product quality can be checked continuously against European Union specifications.",
  // The data path from the production line to the screen
  pipeline: [
    { name: "DS18B20", role: "Temperature sensors" },
    { name: "ESP8266", role: "Microcontroller" },
    { name: "MQTT", role: "Real-time transport" },
    { name: "Cloud", role: "Storage" },
    { name: "Dashboard", role: "Live readings" },
  ],
  facts: [
    { label: "Supervisor", value: "Nikolaos Myridakis" },
    { label: "Published", value: "March 2024" },
    { label: "Length", value: "60 pages · Greek & English" },
    { label: "DOI", value: "10.26265/polynoe-6074" },
  ],
  tags: ["IoT", "Cloud Computing", "Arduino", "Sensors", "MQTT"],
  figure: { src: oilThesis, alt: "Olive oil production line", caption: "Fig. 1 — Production line" },
  links: [
    {
      href: "https://polynoe.lib.uniwa.gr/xmlui/bitstream/handle/11400/6238/Tsivos_242017028.pdf?sequence=1&isAllowed=y",
      label: "Read in Greek",
      icon: "doc",
    },
    {
      href: "https://drive.google.com/file/d/1bERPnZfo7mefAFYu0QOxWSBdCRJSHq7w/view",
      label: "Read in English",
      icon: "doc",
    },
    { href: "http://dx.doi.org/10.26265/polynoe-6074", label: "DOI" },
  ],
};

// GitHub links get the GitHub mark, everything else the web globe unless an icon is given
const ProjectLink = ({ href, label, icon }) => (
  <a className="proj-link cursor-target" data-cursor-label={label} href={href} target="_blank" rel="noreferrer">
    <LinkIcon name={icon || (href.includes("github.com") ? "github" : "web")} />
    {label}
    <span aria-hidden="true">↗</span>
  </a>
);

const ProjectText = ({ kind, title, detail, tags, link }) => (
  <div className="proj-text">
    <p className="proj-kind">{kind}</p>
    <h3 className="proj-title">{title}</h3>
    <p className="proj-detail">{detail}</p>
    <ul className="proj-tags">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
    <ProjectLink {...link} />
  </div>
);

// Every mockup is a target for the section's bracket cursor, labelled with the project name
const ProjectMedia = ({ frame, images, video, url, link, kind, title }) => {
  if (frame === "mac") {
    return (
      <MacWindow
        src={images[0].src}
        video={video}
        href={video ? link.href : undefined}
        alt={images[0].alt}
        url={url}
        className="cursor-target"
        data-cursor-label={title}
      />
    );
  }

  if (frame === "phone") {
    return (
      <div className="proj-phones">
        {images.map(({ src, alt }) => (
          <IPhone key={src} src={src} alt={alt} className="proj-phone cursor-target" data-cursor-label={title} />
        ))}
      </div>
    );
  }

  return (
    <figure className="proj-frame">
      <VisionPro src={images[0].src} alt={images[0].alt} className="cursor-target" data-cursor-label={title} />
      <figcaption>{kind}</figcaption>
    </figure>
  );
};

const ProjectsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.05 });
  // Reduced motion: skip the scroll effects and show every row lit
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Scroll-scrubbed reveal: each row's mockup and text glide in with the scroll (and back out
  // when scrolling up); scrub smoothing lets the motion trail the scroll slightly instead of jumping.
  useEffect(() => {
    const section = ref.current;
    if (!section || reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".proj-row").forEach((row) => {
        const scrub = (start, end) => ({ trigger: row, start, end, scrub: 1 });

        // Colour, traffic lights and screenshots light up once the row is mostly in view
        ScrollTrigger.create({
          trigger: row,
          start: "top 65%",
          onEnter: () => row.classList.add("is-active"),
          onLeaveBack: () => row.classList.remove("is-active"),
        });

        const phones = row.querySelectorAll(".proj-phone");
        if (phones.length) {
          gsap.fromTo(
            phones,
            { y: 120, opacity: 0 },
            { y: 0, opacity: 1, ease: "none", stagger: 0.15, scrollTrigger: scrub("top 90%", "top 30%") }
          );
        } else {
          gsap.fromTo(
            row.querySelector(".proj-media"),
            { y: 100, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, ease: "none", scrollTrigger: scrub("top 95%", "top 45%") }
          );
        }

        const text = row.querySelector(".proj-text");
        if (text) {
          gsap.fromTo(
            text.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: scrub("top 85%", "top 40%") }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [ref, reduced]);

  return (
    <section
      id="projects"
      ref={ref}
      className={`projects-section${inView ? " is-visible" : ""}${reduced ? " is-static" : ""}`}
    >
      {/* Dotted ocean pinned to the screen for the whole section while the projects scroll over it;
          mounted on first view so its intro plays on arrival */}
      <div className="proj-ocean-track" aria-hidden="true">
        <div className="proj-ocean">
          {inView && (
            <DotOcean
              colors={["#6E6E80", "#FFFFFF"]}
              horizon={0.32}
              waveHeight={0.9}
              choppiness={0.8}
              speed={0.8}
              glow={0.35}
              swellRadius={0.9}
            />
          )}
        </div>
      </div>

      {/* Bracket cursor, active only while the pointer is inside this section */}
      <TargetCursor container={ref} cursorColorOnTarget="#a855f7" spinDuration={2} hideDefaultCursor parallaxOn />

      <SectionHeading label="Projects" title="Selected work" subtitle="websites, apps and VR" />

      <div className="proj-list">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`proj-row proj-row--${project.frame}${project.wide ? " proj-row--wide" : ""}${
              project.frame !== "phone" && !project.wide && index % 2 ? " proj-row--flip" : ""
            }`}
          >
            <div className="proj-media">
              <ProjectMedia {...project} />
            </div>
            <ProjectText {...project} />
          </article>
        ))}

        {/* Research rather than a shipped product: a printed thesis instead of a device */}
        <article className="proj-row proj-row--thesis">
          <div className="proj-media">
            <ThesisCover {...thesis} />
          </div>

          <div className="proj-text">
            <p className="proj-kind">Research · Master&apos;s Thesis · 2024</p>
            <h3 className="proj-title">{thesis.title}</h3>
            <p className="proj-detail">{thesis.abstract}</p>

            <ol className="thesis-pipeline" aria-label="System architecture">
              {thesis.pipeline.map(({ name, role }) => (
                <li key={name}>
                  <span className="thesis-node">{name}</span>
                  <span className="thesis-role">{role}</span>
                </li>
              ))}
            </ol>

            <dl className="thesis-facts">
              {thesis.facts.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <ul className="proj-tags">
              {thesis.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <div className="proj-links">
              {thesis.links.map((link) => (
                <ProjectLink key={link.label} {...link} />
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProjectsSection;
