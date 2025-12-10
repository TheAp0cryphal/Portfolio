import { createSignal, onMount } from "solid-js";

const Home = () => {
  const [displayedText, setDisplayedText] = createSignal("");
  const [showFooter, setShowFooter] = createSignal(false);
  const fullText = "Hi, I'm Tanishk";

  const typeText = async () => {
    for (let i = 0; i <= fullText.length; i++) {
      setDisplayedText(fullText.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setTimeout(() => setShowFooter(true), 1000);
  };

  onMount(() => {
    setTimeout(() => typeText(), 800);
  });

  return (
    <div class="container text-center">
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-6 text-lg-start">

          <h1 class="display-4 fw-bold mb-4 text-center">
            <span class="name typing-text">{displayedText()}</span>
            <span class="typing-cursor">|</span>
          </h1>

          <div class="subtext-container">
            <p class="lead mb-4 text-center">
              I am a language agnostic <span class="marked-text">software engineer </span>
              building software that creates <span class="marked-text">value.</span>
            </p>
            <p class="lead mb-4 text-center">Mobile | AI / ML | Backend | Frontend | UI / UX </p>
          </div>

          <div class="button-container d-flex gap-3 justify-content-center">
            <a href="#projects" class="btn btn-primary black-text pulse-hover">
              View My Work
            </a>
            <a href="./assets/TanishkSharma_Resume.pdf" download="TanishkSharma_Resume.pdf" class="btn btn-outline-primary download-button shake-hover">
              Resume 🔗
            </a>
          </div>

          <div
            class="mt-5 text-center"
            style={{
              opacity: showFooter() ? 0.7 : 0,
              transition: "opacity 1s ease-in-out",
              "transition-delay": "1.5s"
            }}
          >
            <p class="small text-white-50 fst-italic">
              Clouds in your way? Send them flying with a drag of your mouse!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;