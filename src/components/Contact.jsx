import "./Contact.css";
import SectionHeading from "./SectionHeading";
import BounceCards from "./reactbits/BounceCards/BounceCards";

const EMAIL = "iaswnas_t@outlook.com";

// Feather icons (same as src/assets/icons), inlined so each card can stroke its own colour
const icon = (color, children) => (
  <svg
    className="contact-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const channels = [
  {
    label: "Mail",
    alt: `Email ${EMAIL}`,
    href: `mailto:${EMAIL}`,
    icon: icon(
      "#28a8ea",
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
      </>,
    ),
  },
  {
    label: "GitHub",
    alt: "Iason on GitHub",
    href: "https://github.com/IasonTsivos",
    icon: icon(
      "#a855f7",
      <>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </>,
    ),
  },
  {
    label: "LinkedIn",
    alt: "Iason on LinkedIn",
    href: "https://www.linkedin.com/in/iasonas-tsivos-1b32b61b9/",
    icon: icon(
      "#0a66c2",
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>,
    ),
  },
];

// Mail opens the mail app in place; the profiles open in a new tab
const openChannel = (index) => {
  const { href } = channels[index];
  if (href.startsWith("mailto:")) {
    window.location.href = href;
  } else {
    window.open(href, "_blank", "noopener,noreferrer");
  }
};

const Contact = () => (
  <section id="contact" className="contact-section">
    <SectionHeading label="Contact" title="Let's work together" subtitle="open to projects and opportunities" />

    {/* Fanned cards: hover spreads them apart, click opens the channel */}
    <div className="contact-cards">
      <BounceCards
        images={channels}
        onCardClick={openChannel}
        containerWidth={520}
        containerHeight={300}
        cardSize={170}
        spread={130}
        rotation={10}
        arc={0}
        pushDistance={70}
        hoverScale={1.08}
        bounciness={0.6}
        animationDelay={0.3}
        animationStagger={0.08}
        borderWidth={3}
        borderColor="rgba(255, 255, 255, 0.22)"
        radius={20}
        shadow
        enableHover
        style={{ maxWidth: "100%" }}
      />
    </div>

    <p className="contact-description">
      I&apos;m excited to collaborate and bring ideas to life. Reach out for opportunities, projects, or just a chat.
    </p>

    {/* The address in plain text too, so it can be copied */}
    <p className="contact-fallback">
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </section>
);

export default Contact;
