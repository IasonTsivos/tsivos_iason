import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card'; // Import Card Component

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     <div className="app-container">
        <Navbar />
        <Card /> {}
        <div className="main-content">
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          {/* Home Section */}
          <section id="home" style={{ padding: '50px' }}>
            <h1 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              COMPUTER AND SOFTWARE ENGINEER
            </h1>
          </section>

          {/* Education Section */}
          <section id="education" style={{ padding: '50px',  }}></section>

          {/* Projects Section */}
          <section id="projects" style={{ padding: '50px' }}></section>

          {/* Work Section */}
          <section id="work" style={{ padding: '50px', }}></section>

          {/* Skills Section */}
          <section id="skills" style={{ padding: '50px' }}></section>

          {/* Demo Content */}
          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
