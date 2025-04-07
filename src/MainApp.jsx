import React, { useState, useEffect, Suspense } from 'react';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <section id="home">
          <Home />
        </section>
        
        {data && data.sections.map((section) => (
          <section key={section.path} id={section.path.substring(1)} className="section">
            {section.component === 'About' && <About header={section.headerTitle} />}
            {section.component === 'Skills' && <Skills header={section.headerTitle} />}
            {section.component === 'Education' && <Education header={section.headerTitle} />}
            {section.component === 'Experience' && <Experience header={section.headerTitle} />}
            {section.component === 'Projects' && <Projects header={section.headerTitle} />}
          </section>
        ))}
      </main>
    </div>
  );
}

export default MainApp;
