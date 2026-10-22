import "./SectionHeading.css";
import FoldText from "./reactbits/FoldText/FoldText";

// Matches the hero title size so every heading on the page reads the same
const TITLE_SIZE = "1.75rem";

/**
 * Section header in the site's Vercel-style voice:
 * a small mono label, a white title that unfolds on scroll, and a grey continuation.
 */
const SectionHeading = ({ label, title, subtitle }) => (
  <div className="section-heading">
    <p className="section-heading-label">{label}</p>
    <h2 className="section-heading-title">
      <FoldText
        text={title}
        trigger="scroll"
        fontSize={TITLE_SIZE}
        fontWeight={600}
        color="var(--text)"
        stagger={0.02}
        duration={0.55}
      />
    </h2>
    {subtitle && (
      <p className="section-heading-subtitle" style={{ fontSize: TITLE_SIZE }}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
