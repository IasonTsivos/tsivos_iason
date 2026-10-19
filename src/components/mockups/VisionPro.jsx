import "./VisionPro.css";

// Visor outline in a 1000 × 520 box: arched top, rounded sides and the nose-bridge cutout at the bottom
const VISOR =
  "M 150 42 C 340 12 660 12 850 42 C 925 54 960 115 960 225 C 960 335 925 420 850 452 " +
  "C 745 492 625 488 585 432 C 558 396 442 396 415 432 C 375 488 255 492 150 452 " +
  "C 75 420 40 335 40 225 C 40 115 75 54 150 42 Z";

/** Apple Vision Pro–style headset; the screenshot is shown through the front glass. */
const VisionPro = ({ src, alt, className = "", ...rest }) => (
  <div className={`vision-pro ${className}`} {...rest}>
    <svg viewBox="0 0 1000 520" role="img" aria-label={alt}>
      <defs>
        <clipPath id="vision-pro-glass">
          <path d={VISOR} />
        </clipPath>
        {/* Curved glass: edges fall off into shadow */}
        <radialGradient id="vision-pro-vignette" cx="50%" cy="45%" r="60%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.75" />
        </radialGradient>
        {/* A soft sweep of reflection across the top of the glass */}
        <linearGradient id="vision-pro-glare" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Band attachments on either side */}
      <path className="vision-pro-strap" d="M 52 168 L 6 182 Q 0 184 0 190 L 0 262 Q 0 268 6 270 L 52 284 Z" />
      <path className="vision-pro-strap" d="M 948 168 L 994 182 Q 1000 184 1000 190 L 1000 262 Q 1000 268 994 270 L 948 284 Z" />

      {/* Aluminium frame behind the glass */}
      <path className="vision-pro-frame" d={VISOR} />

      <g clipPath="url(#vision-pro-glass)">
        <image className="vision-pro-screen" href={src} x="0" y="0" width="1000" height="520" preserveAspectRatio="xMidYMid slice" />
        <rect width="1000" height="520" fill="url(#vision-pro-vignette)" />
        <rect width="1000" height="260" fill="url(#vision-pro-glare)" />
      </g>

      {/* Thin white outline of the glass */}
      <path className="vision-pro-outline" d={VISOR} />
    </svg>
  </div>
);

export default VisionPro;
