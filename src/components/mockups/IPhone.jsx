import "devices.css/dist/devices.min.css";
import "./IPhone.css";

/** iPhone 14 Pro frame from devices.css, scaled down uniformly so every phone is identical. */
const IPhone = ({ src, alt, className = "", ...rest }) => (
  <div className={`iphone ${className}`} {...rest}>
    <div className="device device-iphone-14-pro">
      <div className="device-frame">
        <img className="device-screen" src={src} alt={alt} loading="lazy" />
      </div>
      <div className="device-stripe" />
      <div className="device-header" />
      <div className="device-sensors" />
      <div className="device-btns" />
      <div className="device-power" />
    </div>
  </div>
);

export default IPhone;
