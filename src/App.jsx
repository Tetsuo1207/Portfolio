import { useState, useEffect, useRef } from 'react';
import './App.css';

// Simple carousel component used in the Web Designs section
function Carousel() {
  const images = [
    '/images/tpe_demo.png',
    '/images/authentix_demo.png',
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><rect fill='%23222' width='100%25' height='100%25'/><text x='50%25' y='50%25' fill='%23ffffff' font-size='48' text-anchor='middle' dominant-baseline='middle'>WIP</text></svg>"
  ];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, images.length]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div
      className="webcarousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Inner viewport clips slides so only the center slide is visible.
          The outer .webcarousel keeps overflow visible so arrows can sit outside. */}
      <div className="carousel-viewport">
        <div className="slides" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((src, i) => (
            <div className="slide" key={i}>
              <img src={src} alt={`Web design ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-arrow prev" onClick={prev} aria-label="Previous slide">‹</button>
      <button className="carousel-arrow next" onClick={next} aria-label="Next slide">›</button>
    </div>
  );
}

const navItems = [
  'Profile',
  'Certifications',
  'Projects',
  'Designs',
  'Web Designs',
  'Tools',
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  
  const handleCloseBurger = () => {
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 300); // match CSS transition duration
  };

  // Intersection Observer for cert cards
  const certRefs = [useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );
    certRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for project cards
  const projectRefs = [useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );
    projectRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for fade-in-up animation
  const designRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const webdesignRef = useRef(null);
  const toolRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold: 0.2 }
    );
    designRefs.forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    if (webdesignRef.current) observer.observe(webdesignRef.current);
    toolRefs.forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, []);

  // Smooth scroll for nav links
  useEffect(() => {
    const handleNavClick = (e) => {
      if (e.target.tagName === 'A' && e.target.hash) {
        const targetId = e.target.hash;
        if (targetId === '#profile') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setMenuOpen(false);
        } else {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMenuOpen(false);
          }
        }
      }
    };
    const nav = document.querySelector('.navbar-list');
    if (nav) nav.addEventListener('click', handleNavClick);
    return () => { if (nav) nav.removeEventListener('click', handleNavClick); };
  }, [setMenuOpen]);

  // Back to top button logic
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-root">
      <nav className="navbar">
        <div className="navbar-title">
          <span className="navbar-title-main">Gohan</span>
          <span className="navbar-title-last"> Pescasio</span>
        </div>
        <button
          className="burger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="burger-bar" />
          <span className="burger-bar" />
          <span className="burger-bar" />
        </button>
        <ul className={`navbar-list${menuOpen ? ' open active' : ''}${closing ? ' closing' : ''}`}>
          {menuOpen && (
            <li className="burger-close-btn-wrapper">
              <button className="burger-close-btn" onClick={handleCloseBurger} aria-label="Close menu">✕</button>
            </li>
          )}
          {navItems.map((item) => (
            <li key={item} className="navbar-item">
              <span>
                {item === 'Profile' ? (
                  <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}>Profile</a>
                ) : (
                  <a href={`#${item.replace(/\s+/g, '').toLowerCase()}`}>{item}</a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <main className="main-content">
        <section className="profile-section" id="profile">
          <div className="profile-card animate-slide-up">
            <div className="profile-text">
              <h1>Hi! I&apos;m Gohan Pescasio</h1>
              <p>
                A Computer Science Graduate, UI/UX Designer, and Web Developer dedicated to creating modern, responsive, and user-focused applications. My expertise are React, JavaScript, Data Analysis and various other cutting-edge web technologies.
              </p>
            </div>
            <div className="profile-image">
                <img src="/images/user.png" alt="Profile" className="profile-img dropshadow" />
                <div className="profile-socials" aria-hidden={false}>
                  <a href="https://www.facebook.com/pescasio.gohan/" aria-label="Facebook" className="social-link" target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.16 10.44 21.95v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.89h-2.3V21.95C18.34 21.16 22 17.09 22 12.07z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/gohan-pescasio/" aria-label="LinkedIn" className="social-link" target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.47c0-1.3-.03-2.97-1.81-2.97-1.81 0-2.09 1.42-2.09 2.88v5.56H9.41V9h3.41v1.56h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.34 2.41 4.34 5.54v6.73zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM6.61 20.45H4.07V9h2.54v11.45z"/>
                    </svg>
                  </a>
                </div>
            </div>
          </div>
        </section>
        <section className="certifications-section" id="certifications">
          <h2 className="section-title">Certifications</h2>
          <div className="certifications-grid">
            <div className="cert-card" ref={certRefs[0]} style={{ '--cert-delay': '0s' }}>
              <img src="/images/Certificate_DA.png" alt="Certification 1" className="cert-img" />
              <div className="cert-info">
                <div className="cert-title">Introduction to Data Analytics</div>
                <div className="cert-date">Received: Jan 2025</div>
                <a href="https://imgur.com/a/coursera-certificates-5iBkePs" target="_blank" rel="noopener noreferrer" className="cert-view-btn">View Certificate</a>
              </div>
            </div>
            <div className="cert-card" ref={certRefs[1]} style={{ '--cert-delay': '0.15s' }}>
              <img src="/images/Certificate_DAwSQL.png" alt="Certification 2" className="cert-img" />
              <div className="cert-info">
                <div className="cert-title">Data Analysis with Spreadsheets and SQL</div>
                <div className="cert-date">Received: Feb 2025</div>
                <a href="https://imgur.com/a/coursera-certificates-5iBkePs" target="_blank" rel="noopener noreferrer" className="cert-view-btn">View Certificate</a>
              </div>
            </div>
            <div className="cert-card" ref={certRefs[2]} style={{ '--cert-delay': '0.3s' }}>
              <img src="/images/Certificate_Linux.png" alt="Certification 3" className="cert-img" />
              <div className="cert-info">
                <div className="cert-title">Linux Essentials</div>
                <div className="cert-date">Received: May 2025</div>
                <a href="https://imgur.com/a/cisco-certificates-OlQBKnm" target="_blank" rel="noopener noreferrer" className="cert-view-btn">View Certificate</a>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="projects-section">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="project-card" ref={projectRefs[0]} style={{ '--project-delay': '0s' }}>
              <img src="/images/tpe.png" alt="Project 1 Preview" className="project-preview" />
              <div className="project-info">
                <div className="project-title">Task Priority Estimator</div>
                <div className="project-desc">A simple task organizer that uses random forest to determine the optimal order of which tasks to prioritize.</div>
                <a href="https://taskprioritizer-three.vercel.app" target="_blank" rel="noopener noreferrer" className="project-test-btn">Test Demo</a>
              </div>
            </div>
            <div className="project-card" ref={projectRefs[1]} style={{ '--project-delay': '0.2s' }}>
              <img src="/images/authentix_demo.png" alt="Project 2 Preview" className="project-preview" />
              <div className="project-info">
                <div className="project-title">AuthentiX</div>
                <div className="project-desc">A Sentimet-Based Social Media Impersonation Detector with Sarcasm Analysis Using Machine Learning</div>
                <a href="https://authentix-two.vercel.app" target="_blank" rel="noopener noreferrer" className="project-test-btn">Test Demo</a>
              </div>
            </div>
            
          </div>
        </section>
        <section id="designs" className="designs-section">
          <h2 className="section-title">Poster Designs</h2>
          <div className="designs-grid">
            <div className="design-card" ref={designRefs[0]}>
              <img src="/images/poster1.png" alt="Basketball Poster 1" className="design-img" />
              <div className="design-info">
                <div className="design-title">Zenless Zone Zero(Miyabi)</div>
                <div className="design-desc">Promotional poster design concept. Poster focusing on a game character with the use of different overlays.</div>
                <a href="https://imgur.com/a/XAAbhrx" target="_blank" rel="noopener noreferrer" className="design-view-btn">View</a>
              </div>
            </div>
            <div className="design-card" ref={designRefs[1]}>
              <img src="/images/poster2.png" alt="Basketball Poster 2" className="design-img" />
              <div className="design-info">
                <div className="design-title">McLaren P1 GTR</div>
                <div className="design-desc">Sports car design concept. Poster using a car as the main subject to show its aggressive yet bold design.</div>
                <a href="https://imgur.com/a/UhF6rpd" target="_blank" rel="noopener noreferrer" className="design-view-btn">View</a>
              </div>
            </div>
            <div className="design-card" ref={designRefs[2]}>
              <img src="/images/poster3.png" alt="Basketball Poster 3" className="design-img" />
              <div className="design-info">
                <div className="design-title">Kobe Bryant</div>
                <div className="design-desc">Basketball Poster. Poster that uses the main subjects theme as the whole color pallete.</div>
                <a href="https://imgur.com/a/y10Dm3o" target="_blank" rel="noopener noreferrer" className="design-view-btn">View</a>
              </div>
            </div>
          </div>
        </section>
        <section id="webdesigns" className="webdesigns-section">
          <h2 className="section-title">Web Designs</h2>
          <div className="webdesigns-preview" ref={webdesignRef}>
            {/* Carousel: slides container, autoplay every 5s, pause on hover, arrows to navigate */}
            <Carousel />
          </div>
        </section>
        <section id="tools" className="tools-section">
          <h2 className="section-title">Web Development Tools</h2>
          <div className="tools-grid">
            <div className="tool-card" ref={toolRefs[0]}>
              <img src="/images/js.svg" alt="JavaScript" className="tool-icon" />
              <div className="tool-title">JavaScript</div>
            </div>
            <div className="tool-card" ref={toolRefs[1]}>
              <img src="/images/html5.svg" alt="HTML5" className="tool-icon" />
              <div className="tool-title">HTML5</div>
            </div>
            <div className="tool-card" ref={toolRefs[2]}>
              <img src="/images/css3.svg" alt="CSS3" className="tool-icon" />
              <div className="tool-title">CSS3</div>
            </div>
            <div className="tool-card" ref={toolRefs[3]}>
              <img src="/images/reactjs.svg" alt="React.js" className="tool-icon" />
              <div className="tool-title">React.js</div>
            </div>
            <div className="tool-card" ref={toolRefs[4]}>
              <img src="/images/vite.png" alt="Vite" className="tool-icon" />
              <div className="tool-title">Vite</div>
            </div>
            <div className="tool-card" ref={toolRefs[6]}>
              <img src="/images/github.svg" alt="GitHub" className="tool-icon" />
              <div className="tool-title">GitHub</div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="footer-content">&copy; {new Date().getFullYear()} Gohan Pescasio. All rights reserved.</div>
        </footer>
        {showTopBtn && (
          <button className="back-to-top-btn" onClick={handleBackToTop} aria-label="Back to top">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="none" />
              <path d="M8 16L14 10L20 16" stroke="#D1D5DB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
