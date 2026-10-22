import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Height of the fixed navbar, so sections land just below it
const NAV_OFFSET = 64;
// Breathing room between the navbar and a section's heading after a nav jump
const HEADING_GAP = 32;

let lenis = null;

/**
 * Smooth, eased page scrolling (Lenis), driven by GSAP's ticker so the
 * scroll-triggered text animations stay in sync. Honors prefers-reduced-motion.
 * Returns a cleanup function.
 */
export const startSmoothScroll = () => {
  // A refresh always starts at the top: stop the browser restoring the old position
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  lenis = new Lenis({ duration: 1.1, autoRaf: false });
  lenis.scrollTo(0, { immediate: true });
  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
  };
};

// Sections carry generous top padding, so jumps land on the section's heading instead:
// it ends up just under the navbar rather than below a band of empty space
export const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (!section) return;
  if (id === "home") {
    if (lenis) lenis.scrollTo(section);
    else section.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const target = section.querySelector(".section-heading") ?? section;
  const y = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - HEADING_GAP;
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: "smooth" });
};

// Scroll to an absolute page position, eased through Lenis when it is running
export const scrollToY = (y) => {
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: "smooth" });
};
