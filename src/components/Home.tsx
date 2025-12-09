import { createSignal, onMount } from "solid-js";
import SpeedControl from "./SpeedControl";

const Home = () => {
  const [displayedText, setDisplayedText] = createSignal("");
  const [showSubtext, setShowSubtext] = createSignal(false);
  const [showButtons, setShowButtons] = createSignal(false);

  const fullText = "Hi, I'm Tanishk";

  const typeText = async () => {
    for (let i = 0; i <= fullText.length; i++) {
      setDisplayedText(fullText.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Show subtext after typing is complete
    setTimeout(() => setShowSubtext(true), 500);
    setTimeout(() => setShowButtons(true), 1000);
  };

  onMount(() => {
    setTimeout(() => typeText(), 800);
  });

  return (
    <div class="container text-center fade-in">
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-6 text-lg-start">

          <h1 class="display-4 fw-bold mb-4 text-center">
            <span class="name typing-text">{displayedText()}</span>
            <span class="typing-cursor">|</span>
          </h1>

          <div class={`subtext-container ${showSubtext() ? 'slide-in' : ''}`}>
            <p class="lead mb-4 text-center">
              I am a language agnostic <span class="marked-text">software engineer. </span>
              I build software that creates <span class="marked-text">value.</span>
            </p>
            <p class="lead mb-4 text-center">Mobile | AI / ML | Backend | Frontend | UI / UX </p>
          </div>

          <div class={`button-container d-flex gap-3 justify-content-center ${showButtons() ? 'bounce-in' : ''}`}>
            <a href="#projects" class="btn btn-primary black-text pulse-hover">
              View My Work
            </a>
            <a href="./assets/TanishkSharma_Resume.pdf" download="TanishkSharma_Resume.pdf" class="btn btn-outline-primary download-button shake-hover">
              Resume 🔗
            </a>
          </div>
        </div>
      </div>
      <SpeedControl />
    </div>
  );
};

export default Home;