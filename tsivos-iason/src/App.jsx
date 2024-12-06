import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import SmallCard from './components/SmallerCard';
import TechCardGrid from "./components/TechCardGrid";
import WorkSection from "./components/WorkSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <div className="container">
        {/* Left Section */}
        <div className="left-section">
          <Card />
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            {/* Home Section */}
            <HomeSection />
            <div className="section-divider" />
            {/* Education Section */}
            <EducationSection />
            <div className="section-divider" />

            {/* Projects Section */}
            <ProjectsSection />
            <div className="section-divider" />

            {/* Work Section */}
            <WorkSection />
            <div className="section-divider" />

            {/* Skills Section */}
            <SkillsSection />
          </div>
        </div>
      </div>
    </>
  );
}

const HomeSection = () => {
  return (
    <section id="home" style={{ display: 'flex', padding: '50px', alignItems: 'center' }}>
      {/* Text Section */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1 className="bold-h1">COMPUTER & SOFTWARE</h1>
        <h1 className="bold-h2">ENGINEER</h1>
        <h4 className='h4'>
          Tech enthusiast with love for learning and growing in the IT space. I enjoy tackling
           challenging problems and learning new technologies to enhance my skills. My curiosity 
           drives me to constantly explore emerging trends, from cloud computing to coding, 
           I strive to integrate them into practical solutions.
          From working on automating processes to creating VR environments, I’m driven by the 
          belief that technology can solve real-world problems and transform the way we live and work.
        </h4>
        <section className="statistics-section">
      <div className="stat">
        <h1>7+</h1>
        <p>YEARS OF EXPERIENCE</p>
      </div>
      <div className="stat">
        <h1>4+</h1>
        <p>COMPANIES TRUST</p>
      </div>
      <div className="stat">
        <h1>20+</h1>
        <p>WORLDWIDE CLIENTS</p>
      </div>
      </section>
      </div>
    </section>
  );
};



const SkillsSection = () => {
  return (
    <section id="skills" style={{ padding: '50px' }}>
      <h1 className="bold-h1">TECH</h1>
      <h1 className="bold-h2">SKILLS</h1>
      {/* Add your skills details here */}
      <TechCardGrid />
    </section>
  );
};

export default App;
