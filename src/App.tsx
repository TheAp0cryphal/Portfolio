import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import AsciiBoard from './components/AsciiBoard';
import ScrollReveal from "./components/ScrollReveal";

import { AiFillGithub, AiFillLinkedIn, AiFillMailIcon, OctahedronIcon } from "./utils/IconUtil";
import Skills from "./components/Skills";
import TwinklingStars from "./components/TwinklingStars";
import Clouds from "./components/Clouds";
import Comets from "./components/Comets";

import { createSignal } from "solid-js";
const App = () => {
  const [showGuestbook, setShowGuestbook] = createSignal(false);
  return (
    <div>
      <div class="gradient-background">
        <TwinklingStars />
        <Clouds />
        <Comets />
        <header>
          <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container d-flex justify-content-between align-items-center">
              <a class="navbar-brand" href="#home">
                <span class="navbar-name">T<span class="hide-effect">anishk</span></span>
              </a>
              <ul class="navbar-nav d-none d-lg-flex flex-row">
                <li class="nav-item">
                  <a class="nav-link" href="#home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#about">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#experience">Experience</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#projects">Projects</a>
                </li>
              </ul>
              <ul class="navbar-nav d-flex flex-row">
                <li>
                  <a class="nav-icon" href="https://www.github.com/TheAp0cryphal" data-bs-toggle="tooltip" title="GitHub">
                    <AiFillGithub />
                  </a>
                </li>
                <li>
                  <a class="nav-icon" href="https://www.linkedin.com/in/tanishks" data-bs-toggle="tooltip" title="LinkedIn">
                    <AiFillLinkedIn />
                  </a>
                </li>
                <li>
                  <a class="nav-icon" href="mailto:tanishk.sh@proton.me" data-bs-toggle="tooltip" title="mail: tanishk.sh@proton.me">
                    <AiFillMailIcon />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <br></br> <br></br>
        <section id="home" class="d-flex align-items-center min-vh-100">
          <Home />
        </section>
        <img class="trees" src="/assets/trees.png" style={{ height: "auto", width: "100%" }} />
      </div>
      <main>
        {/* About Section */}
        <section id="about">
          <ScrollReveal>
            <About />
          </ScrollReveal>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <Timeline />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </section>
      </main>

      {/* Guestbook Modal Overlay */}
      <div class={`guestbook-overlay ${showGuestbook() ? 'visible' : ''}`}>
        <div class="guestbook-backdrop" onClick={() => setShowGuestbook(false)}></div>
        <div class="guestbook-modal">
          <button class="close-btn" onClick={() => setShowGuestbook(false)}>×</button>
          <AsciiBoard />
        </div>
      </div>

      {/* Floating Action Button */}
      <button class="guestbook-fab" onClick={() => setShowGuestbook(true)} title="Sign Guestbook">
        <OctahedronIcon />
      </button>

      <Footer />
    </div>
  );
};

export default App;
