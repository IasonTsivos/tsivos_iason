import "./ThesisCover.css";
import seal from "../../assets/icons/pada.png";

/**
 * A hardbound thesis lying at an angle: dark cover with a foil frame, page edges stacked
 * behind it, and a printed photo (Fig. 1) tucked in front.
 */
const ThesisCover = ({ title, author, supervisor, date, figure }) => (
  <div className="thesis">
    <div className="thesis-book cursor-target" data-cursor-label="Master's Thesis">
      <span className="thesis-pages" aria-hidden="true" />
      <div className="thesis-cover">
        <div className="thesis-foil">
          <img className="thesis-seal" src={seal} alt="University of West Attica seal" />
          <p className="thesis-school">
            University of West Attica
            <span>School of Engineering</span>
            <span>Dept. of Informatics &amp; Computer Engineering</span>
          </p>
          <p className="thesis-type">Diploma Thesis</p>
          <h4 className="thesis-title">{title}</h4>
          <p className="thesis-people">
            {author}
            <span>Supervisor: {supervisor}</span>
          </p>
          <p className="thesis-date">{date}</p>
        </div>
      </div>
    </div>

    <figure className="thesis-print cursor-target" data-cursor-label="Fig. 1">
      <img src={figure.src} alt={figure.alt} loading="lazy" />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  </div>
);

export default ThesisCover;
