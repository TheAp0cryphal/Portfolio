import { createSignal } from "solid-js";

const Contact = () => {
    const [formData, setFormData] = createSignal({ name: "", email: "", message: "" });
    const [isFormValid, setIsFormValid] = createSignal(false);
    const [showThankYou, setShowThankYou] = createSignal(false);
    const [characterCount, setCharacterCount] = createSignal(0);
    
    const maxMessageLength = 500;

    const updateFormData = (field: string, value: string) => {
        const newData = { ...formData(), [field]: value };
        setFormData(newData);
        
        if (field === "message") {
            setCharacterCount(value.length);
        }
        
        // Check if form is valid
        const isValid = newData.name.trim().length > 0 && 
                       newData.email.includes("@") && 
                       newData.message.trim().length > 10;
        setIsFormValid(isValid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isFormValid()) return;
        
        const { name, email, message } = formData();
        setShowThankYou(true);
        
        setTimeout(() => {
            window.location.href = `mailto:tanishk.sh@proton.me?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${name} (${email})`;
        }, 1500);
    };

    const getRandomPlaceholder = (field: string) => {
        const placeholders = {
            name: ["What should I call you?", "Your awesome name here", "Who's reaching out?", "Your name goes here 👋"],
            email: ["your.email@domain.com", "Where can I reach you?", "Drop your email here", "Best email to contact you"],
            message: ["Tell me what's on your mind...", "Share your thoughts here", "What would you like to discuss?", "Got any cool ideas? 💡"]
        };
        
        const options = placeholders[field];
        return options[Math.floor(Math.random() * options.length)];
    };

    return (
      <div class="container">
        <div class="text-center mb-2">
          <h2>Get in Touch</h2>
          <p class="text-muted">Have a project in mind? Let's chat! ☕</p>
        </div>
        
        {showThankYou() && (
          <div class="thank-you-message text-center mb-4">
            <div class="celebration-text">
              <h4>🎉 Thank you for reaching out!</h4>
              <p>Redirecting to your email client... 📧</p>
            </div>
          </div>
        )}
        
        <div class="row justify-content-center">
          <div class="col-md-8">
            <form onSubmit={handleSubmit} class={showThankYou() ? "form-hidden" : ""}>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control interactive-input"
                  id="name"
                  placeholder={getRandomPlaceholder("name")}
                  value={formData().name}
                  onInput={(e) => updateFormData("name", e.target.value)}
                />
                {formData().name.length > 0 && (
                  <small class="validation-feedback valid">✓ Looking good!</small>
                )}
              </div>
              
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control interactive-input"
                  id="email"
                  placeholder={getRandomPlaceholder("email")}
                  value={formData().email}
                  onInput={(e) => updateFormData("email", e.target.value)}
                />
                {formData().email.includes("@") && (
                  <small class="validation-feedback valid">✓ Perfect!</small>
                )}
                {formData().email.length > 0 && !formData().email.includes("@") && (
                  <small class="validation-feedback invalid">Please enter a valid email</small>
                )}
              </div>
              
              <div class="mb-3">
                <label for="message" class="form-label">
                  Message 
                  <span class="character-counter">
                    ({characterCount()}/{maxMessageLength})
                  </span>
                </label>
                <textarea
                  class="form-control interactive-input"
                  id="message"
                  rows="4"
                  placeholder={getRandomPlaceholder("message")}
                  maxlength={maxMessageLength}
                  value={formData().message}
                  onInput={(e) => updateFormData("message", e.target.value)}
                ></textarea>
                {formData().message.length > 10 && (
                  <small class="validation-feedback valid">✓ Great message!</small>
                )}
                {formData().message.length > 0 && formData().message.length <= 10 && (
                  <small class="validation-feedback invalid">Please write a bit more (at least 10 characters)</small>
                )}
              </div>
              
              <button 
                type="submit" 
                class={`btn btn-outline-warning mt-2 submit-button ${isFormValid() ? 'ready-to-send' : 'not-ready'}`}
                disabled={!isFormValid()}
              >
                {isFormValid() ? "Send via Email 🚀" : "Fill out the form above ⬆️"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Contact;
  