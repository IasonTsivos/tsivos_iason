import "./MacWindow.css";

/** A macOS-style browser window: traffic lights, a URL bar and the screenshot as the page. */
const MacWindow = ({ src, alt, url, className = "", ...rest }) => (
  <div className={`mac-window ${className}`} {...rest}>
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
      <img src={src} alt={alt} loading="lazy" />
    </div>
  </div>
);

export default MacWindow;
