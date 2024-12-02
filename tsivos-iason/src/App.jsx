import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card'; // Import Card Component

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app-container">
        <Card />
        <Navbar />
        <div style={{ marginTop: '00px', textAlign: 'left' }}>
          {/* Home Section */}
          <HomeSection />

          {/* Education Section */}
          <EducationSection />

          {/* Projects Section */}
          <ProjectsSection />

          {/* Work Section */}
          <WorkSection />

          {/* Skills Section */}
          <SkillsSection />

          {/* Demo Content */}
          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            {/* Add any other content if needed */}
          </div>
        </div>
      </div>
    </>
  );
}

const HomeSection = () => {
  return (
    <section id="home" style={{ padding: '50px' }}>
      <h1 className="bold-h1">
        COMPUTER & SOFTWARE
      </h1>
      <h1 className="bold-h2">
        ENGINEER
      </h1>
      <h3>
        Tech enthusiast with love for learning and growing in the IT space. I enjoy tackling challenging problems and learning new technologies to enhance my skills. My curiosity drives me to constantly explore emerging trends, from cloud computing to Coding, and I strive to integrate them into practical solutions.
        From working on Automating processes to creating VR environments, I’m driven by the belief that technology can solve real-world problems and transform the way we live and work.
      </h3>
    </section>
  );
};

const EducationSection = () => {
  return (
    <section id="education" style={{ padding: '50px' }}>
      <h2>Education Section</h2>
      {/* Add your education details here */}
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" style={{ padding: '50px' }}>
      <h2>Projects Section</h2>
      {/* Add your project details here */}
    </section>
  );
};

const WorkSection = () => {
  return (
    <section id="work" style={{ padding: '50px' }}>
      <h2>Work Section</h2>
      {/* Add your work details here */}
    </section>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" style={{ padding: '50px' }}>
      <h2>Skills Section</h2>
      {/* Add your skills details here */}
    </section>
  );
};

export default App;
