import { useEffect, useState } from "react";
import "./Navbar.css";
import githubIcon from "../assets/icons/github.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import { scrollToSection } from "../utils/scroll";

const links = [
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar-inner">
        <button type="button" className="navbar-brand" onClick={() => scrollToSection("home")}>
          <span className="navbar-logo">IT</span>
          <span className="navbar-name">Tsivos Iason</span>
        </button>

        <ul className="navbar-links">
          {links.map(({ id, label }) => (
            <li key={id}>
              <button type="button" className="navbar-link" onClick={() => scrollToSection(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <a
            className="navbar-icon"
            href="https://github.com/IasonTsivos"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img src={githubIcon} alt="" />
          </a>
          <a
            className="navbar-icon"
            href="https://www.linkedin.com/in/iasonas-tsivos-1b32b61b9/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img src={linkedinIcon} alt="" />
          </a>
          <button type="button" className="navbar-cta" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
