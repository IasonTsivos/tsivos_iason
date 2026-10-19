import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkSection from "./components/WorkSection";
import Contact from './components/Contact';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import TechCardGrid from "./components/TechCardGrid";
import { startSmoothScroll } from "./utils/scroll";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG8bRjOm6GdVW5aMAWQtfh0ZdqpM0moDo",
  authDomain: "personal-website-53135.firebaseapp.com",
  projectId: "personal-website-53135",
  storageBucket: "personal-website-53135.firebasestorage.app",
  messagingSenderId: "350740221329",
  appId: "1:350740221329:web:98075e6aa5f425fe3f5e30",
  measurementId: "G-H7DC4EKHQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function App() {
  useEffect(() => startSmoothScroll(), []);

  return (
    <>
      <Navbar />
      <Hero />

      <main className="page">
        <EducationSection />

        <ProjectsSection />
        <div className="section-divider" />

        <WorkSection />
        <div className="section-divider" />

        <SkillsSection />
        <div className="section-divider" />

        <Contact />
      </main>
    </>
  );
}

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
