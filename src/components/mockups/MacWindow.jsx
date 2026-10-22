import "./MacWindow.css";

/** A macOS-style browser window: traffic lights, a URL bar and the screenshot (or a muted looping video) as the page.
    With an href the whole window links to the site. */
const MacWindow = ({ src, alt, video, url, href, className = "", ...rest }) => {
  const Tag = href ? "a" : "div";
  const linkProps = href ? { href, target: "_blank", rel: "noreferrer" } : {};

  return (
    <Tag
      className={`mac-window${video ? " mac-window--video" : ""} ${className}`}
      {...linkProps}
      {...rest}
    >
      <div className="mac-bar">
        <span className="mac-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {url && (
          <span className="mac-url">
            <span aria-hidden="true">⌁</span> {url}
          </span>
        )}
      </div>
      <div className="mac-screen">
        {video ? (
          <video
            src={video}
            aria-label={alt}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img src={src} alt={alt} loading="lazy" />
        )}
      </div>
    </Tag>
  );
};

export default MacWindow;
