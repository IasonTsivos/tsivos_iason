import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WorkSection.css";
import SectionHeading from "./SectionHeading";
import LinkIcon from "./mockups/LinkIcon";
import Oscilloscope from "./backgrounds/Oscilloscope/Oscilloscope";
import { scrollToY } from "../utils/scroll";
import useIsMobile from "../utils/useIsMobile";
import knapp from "../assets/icons/knapp_logo.svg";
import avitron from "../assets/icons/avitron.png";
import utg from "../assets/icons/utg.png";
import podimatas from "../assets/icons/podimatas.png";
import tempo from "../assets/icons/tempo.png";
import projector from "../assets/icons/prcompany.png";

gsap.registerPlugin(ScrollTrigger);

// darkLogo: the logo is drawn in black, so it is inverted to read on the dark panel
const jobs = [
  {
    company: "Knapp",
    short: "Knapp",
    kind: "Automation · Engineering",
    role: "Development & Automation Engineer",
    detail: "Logistics automation",
    logo: knapp,
    darkLogo: true,
    href: "https://www.knapp.com",
  },
  {
    company: "Avitron",
    short: "Avitron",
    kind: "Live events · Production",
    role: "Event Equipment Installation Assistant",
    detail: "Event production",
    logo: avitron,
    href: "https://www.avitron.gr",
  },
  {
    company: "United Technical Group",
    short: "UTG",
    kind: "Live events · LED video",
    role: "LED Screen Technician",
    detail: "LED walls and screens",
    logo: utg,
    href: "https://www.utg-greece.com",
  },
  {
    company: "Podimatas Group",
    short: "Podimatas",
    kind: "Conferences",
    role: "Conference Organization Assistant",
    detail: "Conference organisation",
    logo: podimatas,
    href: "https://www.podimatas.gr",
  },
  {
    company: "Tempo Events",
    short: "Tempo",
    kind: "Live events · Audiovisual",
    role: "Audiovisual Technician",
    detail: "Sound, light and video",
    logo: tempo,
    href: "https://tempoevents.gr",
  },
  {
    company: "Projector Company",
    short: "Projector",
    kind: "Broadcast · Live stream",
    role: "Live-Stream Operator",
    detail: "Live-stream production",
    logo: projector,
    href: "https://projector-web.gr/gr/home",
  },
];

// The scroll through the reel is shown as broadcast timecode (HH:MM:SS:FF at 25 fps)
const REEL_SECONDS = jobs.length * 12;
const FPS = 25;
const pad = (n) => String(n).padStart(2, "0");
const timecode = (progress) => {
  const frames = Math.round(progress * REEL_SECONDS * FPS);
  const seconds = Math.floor(frames / FPS);
  return `00:${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}:${pad(frames % FPS)}`;
};

const WorkSection = () => {
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const playheadRef = useRef(null);
  const timecodeRef = useRef(null);
  const triggerRef = useRef(null);
  // Scroll speed fed to the oscilloscope: fast scrolling makes the signal swell
  const energyRef = useRef(0);
  const [active, setActive] = useState(0);
  // Reduced motion: no pinning or sideways reel, the jobs are listed down the page
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const isMobile = useIsMobile();

  // The HUD reads the same on both layouts: playhead, timecode and the live camera
  const showProgress = (progress) => {
    playheadRef.current.style.left = `${progress * 100}%`;
    timecodeRef.current.textContent = timecode(progress);
    setActive(Math.round(progress * (jobs.length - 1)));
  };

  // Desktop: the stage pins and the reel of jobs scrolls sideways under it, scrubbed by the page
  // scroll. The track leans with the scroll speed and the HUD (playhead, timecode, CAM counter) follows.
  useEffect(() => {
    if (reduced) return undefined;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const lean = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3.out" });
      let velocity = 0;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            velocity = self.getVelocity();
            showProgress(self.progress);
          },
        },
      });
      triggerRef.current = tween.scrollTrigger;

      // The speed dies away once the scroll stops, so the lean and the signal settle
      const settle = () => {
        velocity *= 0.9;
        energyRef.current = Math.min(3, Math.abs(velocity) / 1500);
        lean(gsap.utils.clamp(-4, 4, velocity / -600));
      };
      gsap.ticker.add(settle);

      return () => {
        gsap.ticker.remove(settle);
        triggerRef.current = null;
        energyRef.current = 0;
      };
    });

    return () => mm.revert();
  }, [reduced]);

  // Phones: the reel is a native sideways swipe with the panels snapping to the centre.
  // Its scroll position drives the HUD, and the swipe speed drives the scope.
  useEffect(() => {
    if (reduced || !isMobile) return undefined;
    const track = trackRef.current;
    let lastLeft = track.scrollLeft;
    let lastTime = performance.now();
    let frame = 0;

    const update = () => {
      frame = 0;
      const now = performance.now();
      const speed = ((track.scrollLeft - lastLeft) / Math.max(1, now - lastTime)) * 1000;
      lastLeft = track.scrollLeft;
      lastTime = now;
      energyRef.current = Math.max(energyRef.current, Math.min(3, Math.abs(speed) / 1500));
      const max = track.scrollWidth - track.clientWidth;
      showProgress(max > 0 ? track.scrollLeft / max : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const settle = () => {
      energyRef.current *= 0.9;
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    gsap.ticker.add(settle);
    update();

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(settle);
      energyRef.current = 0;
    };
  }, [isMobile, reduced]);

  // Scrubber markers jump the reel to that job
  const cue = (index) => {
    const share = index / (jobs.length - 1);
    if (isMobile) {
      const track = trackRef.current;
      track.scrollTo({ left: share * (track.scrollWidth - track.clientWidth), behavior: "smooth" });
      return;
    }
    const trigger = triggerRef.current;
    if (!trigger) return;
    scrollToY(trigger.start + share * (trigger.end - trigger.start));
  };

  return (
    <section id="work" className={`work-section${reduced ? " work-section--static" : ""}`}>
      <SectionHeading label="Work" title="Experience" subtitle="from live stages to automation" />

      <div ref={stageRef} className="work-stage">
        <div className="work-scope">
          <Oscilloscope energyRef={energyRef} />
        </div>

        {/* Broadcast overlay: recording light, timecode and the active camera */}
        <div className="work-hud" aria-hidden="true">
          <span className="work-rec">
            <span className="work-rec-dot" /> REC
          </span>
          <span className="work-hud-title">Career feed</span>
          <span ref={timecodeRef} className="work-timecode">
            {timecode(0)}
          </span>
        </div>

        <ol ref={trackRef} className="work-track">
          {jobs.map((job, index) => (
            <li key={job.company} className={`work-panel${index === active ? " is-live" : ""}`}>
              <span className="work-index" aria-hidden="true">
                {pad(index + 1)}
              </span>

              <div className="work-panel-top">
                <span className="work-tally" aria-hidden="true" />
                <span className="work-cam">CAM {pad(index + 1)}</span>
                <span className="work-kind">{job.kind}</span>
              </div>

              <div className="work-logo">
                <img src={job.logo} alt={`${job.company} logo`} className={job.darkLogo ? "is-dark" : ""} />
              </div>

              <h3 className="work-company">{job.company}</h3>
              <p className="work-role">{job.role}</p>
              <p className="work-detail">{job.detail}</p>

              <a className="work-link" href={job.href} target="_blank" rel="noreferrer">
                <LinkIcon name="web" />
                Visit site
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>

        {/* Timeline scrubber: one cue per job, the playhead follows the scroll */}
        <div className="work-scrubber">
          <div className="work-scrubber-head">
            <span>
              CAM {pad(active + 1)} / {pad(jobs.length)}
            </span>
            <span className="work-scrubber-live">{jobs[active].short}</span>
          </div>
          <div className="work-scrubber-rail">
            <span ref={playheadRef} className="work-playhead" aria-hidden="true" />
            {jobs.map((job, index) => (
              <button
                key={job.company}
                type="button"
                className={`work-cue${index === active ? " is-live" : ""}`}
                style={{ left: `${(index / (jobs.length - 1)) * 100}%` }}
                onClick={() => cue(index)}
                aria-label={`Jump to ${job.company}`}
              >
                <span className="work-cue-label">{job.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
