import { createSignal, createResource } from "solid-js";
import { webLlmService } from "./webLlm";

const gameContext = `
You're in a dark room. You can't see much, but you need to find a lightbulb to illuminate the room and learn more about the person who owns this space.

The game should respond to user commands like "look around", "search the desk", etc. 
If the user finds the lightbulb and uses it (e.g., "install lightbulb", "turn on light"), 
tell them they've successfully illuminated the room and can now see information about the room's owner.

Keep responses brief (1-3 sentences) and atmospheric. Guide the user subtly toward finding the lightbulb.
`;

export function createTextAdventureGame(onComplete: () => void) {
  const [gameOutput, setGameOutput] = createSignal<string[]>([
    "You're in a dark room. You can barely make out some furniture shapes. Find a lightbulb to illuminate the space.",
    "Type commands like 'look around' to interact with the environment."
  ]);
  
  const [inputHistory, setInputHistory] = createSignal<string[]>([]);
  const [modelReady, setModelReady] = createSignal(false);
  const [loadingStatus, setLoadingStatus] = createSignal({ text: "Loading model...", percent: 0 });
  
  // Initialize the model
  const initializeModel = async () => {
    const result = await webLlmService.initialize();
    setModelReady(result);
    return result;
  };
  
  // Start initialization
  const [modelInitStatus] = createResource(initializeModel);
  
  // Update loading status periodically
  const updateLoadingStatus = () => {
    if (!modelReady()) {
      const status = webLlmService.getLoadingStatus();
      setLoadingStatus(status.progress);
      setTimeout(updateLoadingStatus, 500);
    }
  };
  updateLoadingStatus();
  
  const generatePrompt = (userInput: string) => {
    const history = inputHistory().map(cmd => `User: ${cmd}`).join("\n");
    return `${gameContext}\n\n${history}\n\nUser: ${userInput}\nGame:`;
  };
  
  const checkForGameCompletion = (response: string) => {
    const completionPhrases = [
      "light comes on", "room is illuminated", "can now see", 
      "light fills the room", "successfully illuminated", "found the lightbulb"
    ];
    
    if (completionPhrases.some(phrase => response.toLowerCase().includes(phrase))) {
      setTimeout(() => onComplete(), 1500);
      return true;
    }
    return false;
  };
  
  const handleCommand = async (command: string) => {
    if (!modelReady()) {
      setGameOutput([...gameOutput(), "The game is still loading. Please wait a moment..."]);
      return "loading";
    }
    
    // Add user command to display
    setGameOutput([...gameOutput(), `> ${command}`]);
    
    // Update input history
    setInputHistory([...inputHistory(), command]);
    
    // Generate response
    const prompt = generatePrompt(command);
    const response = await webLlmService.generateResponse(prompt);
    
    // Check for game completion
    checkForGameCompletion(response);
    
    // Add response to display
    setGameOutput([...gameOutput(), response]);
    
    return response;
  };
  
  return { 
    gameOutput, 
    handleCommand, 
    modelReady,
    loadingStatus
  };
} 