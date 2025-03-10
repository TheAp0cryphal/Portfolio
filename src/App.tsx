import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";

const App = () => {
  return (
    <div class="gradient-background">
      <header>
        <nav class="navbar navbar-expand-lg fixed-top">
          <div class="container">
            <a class="navbar-brand" href="#">
              <span class="navbar-name">T<span class="hide-effect">anishk</span></span>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
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
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section id="home" class="d-flex align-items-center min-vh-100">
          <Home />
        </section>
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
