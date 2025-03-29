import { createSignal, createEffect } from "solid-js";
import { CreateMLCEngine } from "@mlc-ai/web-llm";

const LLMComponent = (props) => {
  const [llmOutput, setLlmOutput] = createSignal("");
  const [engine, setEngine] = createSignal(null);

  // Load the in-browser LLM engine on mount.
  createEffect(async () => {
    // Replace "Gemma-2b" with your model identifier and adjust options as needed.
    const eng = await CreateMLCEngine("Gemma-2b", {
      initProgressCallback: (progress) => console.log("Loading progress:", progress)
    });
    setEngine(eng);
  });

  // Function to query the local LLM.
  const queryLLM = async (prompt, context) => {
    if (!engine()) {
      setLlmOutput("Model not loaded yet. Please wait...");
      return;
    }
    // Construct a message array using the current context and prompt.
    const messages = [
      { role: "system", content: context },
      { role: "user", content: prompt }
    ];
    try {
      // Call the in-browser LLM using an OpenAI‑style API.
      const response = await engine().chat.completions.create({
        messages,
        stream: false // Set to true for streaming responses.
      });
      const outputText = response.choices[0].message;
      setLlmOutput(outputText);
      // If the output indicates that the switch was found, notify the parent.
      if (outputText.toLowerCase().includes("switch found")) {
        props.onSwitchFound && props.onSwitchFound();
      }
    } catch (error) {
      setLlmOutput("Error processing local LLM query. Please try again.");
    }
  };

  // Pass the query function back to the parent component.
  props.setLLMQuery && props.setLLMQuery(() => queryLLM);

  return (
    <div class="llm-output">
      <p>LLM Response: {llmOutput()}</p>
    </div>
  );
};

export default LLMComponent;
