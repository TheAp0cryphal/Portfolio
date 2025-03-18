const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;
        window.location.href = `mailto:tanishk.sh@proton.me?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${name} (${email})`;
    };

    return (
      <div class="container">
        <div class="text-center mb-2">
          <h2>Get in Touch</h2>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Your Name"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="name@example.com"
                />
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea
                  class="form-control"
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-outline-warning mt-2">
                Send via Email
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Contact;
  