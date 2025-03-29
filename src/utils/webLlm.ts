import { createChatModule } from "@mlc-ai/web-llm";

class WebLlmService {
  private chatModule: any = null;
  private isLoading = true;
  private progress = { text: "Loading model...", percent: 0 };
  private modelName = "Phi-3-mini-4k-instruct-q4f16_1";

  async initialize() {
    try {
      this.chatModule = await createChatModule();
      
      // Set up progress callback
      await this.chatModule.reload(this.modelName, {
        initProgressCallback: (report) => {
          this.progress = {
            text: report.text || "Loading model...",
            percent: report.progress * 100
          };
        }
      });
      
      this.isLoading = false;
      return true;
    } catch (error) {
      console.error("Error initializing WebLLM:", error);
      return false;
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.chatModule || this.isLoading) {
      return "Model is still loading. Please wait...";
    }

    try {
      const response = await this.chatModule.generate(prompt, {
        stream: false,
        temperature: 0.7,
        max_tokens: 256
      });
      
      return response.text.trim();
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I encountered an error while processing your request.";
    }
  }

  getLoadingStatus() {
    return {
      isLoading: this.isLoading,
      progress: this.progress
    };
  }
}

export const webLlmService = new WebLlmService(); 