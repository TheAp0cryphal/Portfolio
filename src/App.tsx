import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";

import { AiFillGithub, AiFillLinkedIn, AiFillMailIcon } from "./utils/IconUtil";

const App = () => {
  return (
    <div>
      <div class="gradient-background">
        <header>
          <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container">
              <a class="navbar-brand " href="#home">
                <span class="navbar-name">T<span class="hide-effect">anishk</span></span>
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
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
                  <ul class="navbar-nav ms-auto">
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
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Timeline />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
