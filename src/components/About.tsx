import { createSignal, onMount, createEffect } from "solid-js";

const About = () => {
  const [showAbout, setShowAbout] = createSignal(false);
  const [gameOutput, setGameOutput] = createSignal("");
  const [gameCompleted, setGameCompleted] = createSignal(false);
  const [inputValue, setInputValue] = createSignal("");
  const [scenario, setScenario] = createSignal<any>(null);
  const [flashlightFound, setFlashlightFound] = createSignal(false);

  // Ref for the game output container to enable auto-scrolling
  let gameOutputRef: HTMLDivElement | undefined;

  // Auto-scroll to bottom when new content is added
  const scrollToBottom = () => {
    if (gameOutputRef) {
      gameOutputRef.scrollTop = gameOutputRef.scrollHeight;
    }
  };

  // Effect to auto-scroll when game output changes
  createEffect(() => {
    gameOutput(); // Track changes to gameOutput
    setTimeout(scrollToBottom, 50); // Small delay to ensure content is rendered
  });

  // Random scenarios that change each refresh
  const scenarios = [
    {
      description: "🏠 You're in a cozy room. There's a CUTE DOG wagging its tail playfully near an old wooden table.",
      flashlightSource: "dog",
      flashlightAction: "pet",
      petAction: "pet",
      hint: "💡 Try: PET DOG, LOOK AROUND, or interact with what you see",
      successMessage: "🐕 The dog barks happily and drops something shiny from its mouth - a FLASHLIGHT!"
    },
    {
      description: "🚗 You're standing next to a vintage car. The ENGINE is humming softly and there's a friendly MECHANIC working under the hood.",
      flashlightSource: "mechanic",
      flashlightAction: "talk",
      petAction: "talk",
      hint: "💡 Try: TALK TO MECHANIC, HELP MECHANIC, or see what they're doing",
      successMessage: "🔧 The mechanic smiles and hands you a FLASHLIGHT saying 'You might need this!'"
    },
    {
      description: "🌳 You're in a magical garden. A wise old CAT sits peacefully by a sparkling fountain, watching you with knowing eyes.",
      flashlightSource: "cat",
      flashlightAction: "pet",
      petAction: "pet",
      hint: "💡 Try: PET CAT, TALK TO CAT, or show the cat some kindness",
      successMessage: "🐱 *Purr* The cat nuzzles against you and reveals a hidden FLASHLIGHT behind the fountain!"
    },
    {
      description: "🎮 You're in a retro arcade. There's a mysterious FORTUNE MACHINE with blinking lights and an old WIZARD figure inside the glass case.",
      flashlightSource: "machine",
      flashlightAction: "play",
      petAction: "ask",
      hint: "💡 Try: ASK FORTUNE, PLAY MACHINE, or make a wish",
      successMessage: "🔮 *DING!* The wizard grants your wish! A FLASHLIGHT materializes in the prize slot!"
    },
    {
      description: "🏖️ You're on a beautiful beach. There's a SANDCASTLE with intricate details and a small HERMIT CRAB scuttling around it.",
      flashlightSource: "crab",
      flashlightAction: "follow",
      petAction: "follow",
      hint: "💡 Try: FOLLOW CRAB, WATCH CRAB, or see where it leads you",
      successMessage: "🦀 The hermit crab leads you to a buried treasure spot and uncovers a FLASHLIGHT in the sand!"
    },
    {
      description: "🎪 You're at a magical carnival. There's a MIME ARTIST performing silently and a BALLOON VENDOR with colorful balloons nearby.",
      flashlightSource: "mime",
      flashlightAction: "copy",
      petAction: "mimic",
      hint: "💡 Try: MIMIC MIME, COPY MIME, or play along with the performance",
      successMessage: "🎭 The mime smiles and pulls a FLASHLIGHT out of thin air - real magic!"
    }
  ];

  const wittyResponses = [
    "🤔 Hmm, that's creative but try looking around more!",
    "💭 Interesting idea! But maybe try interacting with someone or something?",
    "🎯 Nice try! Look for who or what might help you here.",
    "✨ I like your thinking, but try a different approach.",
    "🔄 Good attempt! Maybe try being friendly to what you see?",
    "🤷‍♂️ Not quite! Try connecting with your surroundings.",
  ];

  const getRandomResponse = () => wittyResponses[Math.floor(Math.random() * wittyResponses.length)];

  const addToOutput = (text: string) => {
    setGameOutput(prev => prev + text + "\n\n");
  };

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const currentScenario = scenario();

    if (cmd === "help" || cmd === "?") {
      addToOutput("🎮 Available commands: LOOK, and whatever you want to try!");
      addToOutput(currentScenario.hint);
      return;
    }

    if (cmd === "look" || cmd === "l") {
      addToOutput(currentScenario.description);
      addToOutput(currentScenario.hint);
      return;
    }

    // Check for main interaction actions (more flexible matching)
    if (cmd.includes("pet") || cmd.includes("talk") || cmd.includes("ask") || 
        cmd.includes("follow") || cmd.includes("mimic") || cmd.includes("copy") || 
        cmd.includes("help") || cmd.includes("watch")) {
      
      if (!flashlightFound()) {
        // Check if they're interacting with the right thing
        if (cmd.includes("dog") || cmd.includes("cat") || cmd.includes("mechanic") || 
            cmd.includes("crab") || cmd.includes("mime") || cmd.includes("fortune") ||
            cmd.includes("wizard") || cmd.includes(currentScenario.flashlightSource)) {
          addToOutput(currentScenario.successMessage);
          setFlashlightFound(true);
          addToOutput("🔦 Now you can USE FLASHLIGHT to illuminate the about section!");
        } else {
          addToOutput("🤷‍♂️ Try interacting with what's described in the scene!");
          addToOutput(currentScenario.hint);
        }
      } else {
        addToOutput("😊 You already discovered the flashlight! Now use it to reveal the about section.");
      }
      return;
    }

    // Alternative ways to find the flashlight
    if (cmd.includes("play") && currentScenario.flashlightSource === "machine") {
      if (!flashlightFound()) {
        addToOutput(currentScenario.successMessage);
        setFlashlightFound(true);
        addToOutput("🔦 Now you can USE FLASHLIGHT to illuminate the about section!");
      } else {
        addToOutput("🎮 You already played the machine and got the flashlight!");
      }
      return;
    }

    // Use flashlight - win condition
    if ((cmd.includes("use") || cmd.includes("turn") || cmd.includes("activate") || cmd.includes("shine")) && 
        cmd.includes("flashlight")) {
      if (flashlightFound()) {
        addToOutput("💡 *CLICK* The flashlight illuminates everything!");
        addToOutput("🎉 AMAZING! The light reveals the about section!");
        addToOutput("✨ Welcome to learning about me! 🎊");
        setGameCompleted(true);
        setTimeout(() => setShowAbout(true), 2000);
      } else {
        addToOutput("❌ You need to find the flashlight first! Try interacting with what you see around you.");
        addToOutput(currentScenario.hint);
      }
      return;
    }

    // Easter eggs
    if (cmd.includes("konami") || cmd === "up up down down left right left right b a") {
      addToOutput("🎮 Konami Code detected! But this isn't that kind of game... 😄");
      return;
    }

    if (cmd.includes("sudo") || cmd.includes("admin")) {
      addToOutput("💻 No sudo powers here! This is a simple adventure.");
      return;
    }

    if (cmd.includes("hack") || cmd.includes("cheat")) {
      addToOutput("🕵️‍♂️ No cheating needed! Just try being friendly and curious.");
      return;
    }

    // Default response
    addToOutput(getRandomResponse());
    addToOutput(currentScenario.hint);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputValue().trim() && !gameCompleted()) {
      const command = inputValue().trim();
      addToOutput(`> ${command}`);
      processCommand(command);
      setInputValue("");
    }
  };

  const startGame = () => {
    // Pick a random scenario
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setScenario(randomScenario);
    
    addToOutput("🎮 Welcome to Portfolio Adventure!");
    addToOutput("Your mission: Find and use a flashlight to illuminate the about section!");
    addToOutput("═══════════════════════════════════════════════");
    addToOutput(randomScenario.description);
    addToOutput("═══════════════════════════════════════════════");
    addToOutput(randomScenario.hint);
  };

  onMount(() => {
    startGame();
  });

  return (
    <div class="container">
      <div class="text-center mb-5">
        <h2>About Me</h2>
      </div>
      
      {!showAbout() && (
        <div class="text-adventure-container" style={{ display: "block" }}>
          <div class="text-adventure-screen">
            <div class="game-header">
              <div class="game-title">📱 Portfolio Terminal</div>
              <button 
                class="skip-button" 
                onclick={() => setShowAbout(true)}
                title="Skip the adventure and go directly to about section"
              >
                Skip →
              </button>
            </div>
            
            <div 
              ref={gameOutputRef}
              class="game-output" 
              style={{ "white-space": "pre-wrap", "max-height": "350px", "overflow-y": "auto" }}
            >
              {gameOutput()}
            </div>
            
            <div class="game-status-bar">
              {flashlightFound() ? (
                <span class="status-item found">🔦 Flashlight Found!</span>
              ) : (
                <span class="status-item searching">🔍 Searching for flashlight...</span>
              )}
            </div>
            
            <div class="game-input-container">
              <span class="prompt">$</span>
              <input 
                type="text" 
                class="game-input" 
                placeholder={gameCompleted() ? "Adventure completed! Loading..." : "Type a command..."}
                value={inputValue()}
                onInput={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={gameCompleted()}
              />
            </div>
          </div>
          
          <div class="game-hints">
            <div class="hint-box">
              <strong>💡 Discovery Tips:</strong> Try being curious and friendly! 
              Interact with characters and objects naturally - pet, talk, follow, watch, help...
            </div>
          </div>
        </div>
      )}
      
      <div class={`about-content ${showAbout() ? 'fade-in' : 'fade-out'}`}>
        {showAbout() && (
          <div class="row">
            <div class="col-md-6">
              <p class="h5">
                Congratulations for making it till here! That tells me you're curious, which is a trait I highly value (and probably share!). 
                This is a great opportunity for me to broadcast about myself, how I think and my world-view of the current state of affairs in technology and how I reflect on it.
              </p>
              <p>
                I like working with, and spend most of my time fiddling with technology. To nurture a holistic understanding of tech and business,
                I keep up-to-date with the latest developments, observing and building upon the rapid progress that's happening each day. 
              </p>
              <p>
                I am a <span class="marked-text">π-shaped software engineer</span> with deep vertical expertise in Mobile Development, Backend Systems, and AI/ML. 
                My breadth spans embedded systems, full-stack development, and UI/UX design. I've had the chance to work on everything from building 
                vehicle infotainment platforms at Rivian to creating AI-powered speech recognition and generative tools for a gaming startup. 
                Along the way, I've engineered backend solutions using Python and Azure, and developed 
                robust mobile apps in Kotlin and Java that have reached thousands of users.
              </p>
            </div>
            <div class="col-md-6">
              <p>
                The need to have a multi-faceted approach to creating valuable software is something that is becoming extremely necessary.
                This is why I've built a diverse skillset that allows me to attack the problem on all sides and provide a unique value proposition.
              </p>
              <h4>Beyond Programming: The Art of Software Engineering</h4>
              <p class="h5">
                For some people, programming is simply a zero-sum algorithm game...
              </p>
              <p>
                I beg to differ, I believe that the real skill lies in having a comprehensive vision for how these cogs fit together
                to build a functional and valuable system; which is what Software Engineering truly entails. 
                My deep appreciation for this broader perspective, gained through building complex software, has driven me to cultivate my acumen in this area.
              </p>
              <p>
                My skills as a software engineer are complemented by a clear technological vision to prioritize high impact tasks successfully.
                I believe a crucial aspect of technical expertise is knowing when not to over-engineer solutions, 
                understanding the limitations and avoiding the computational equivalent of using a sledgehammer to crack a nut.
              </p>
              <p class="h5">I like to evaluate my work on the following principles:</p>
              <ul> 
                <li>
                  <span class="marked-text">User First:</span> I always begin by empathizing with the end-user, ensuring every decision is rooted in genuine user needs and real-world challenges.
                </li>
                <li>
                  <span class="marked-text">Elegant Simplicity:</span> I believe that clarity is the foundation of great design; each system should be as straightforward as it is functional.
                </li>
                <li>
                  <span class="marked-text">Scalable Efficiency:</span> My approach centers on maintaining peak performance, with a constant focus on reducing bottlenecks and latency.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
