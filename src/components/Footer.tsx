const Footer = () => {
  return (
    <footer class="text-center text-lg-start">
      <div class="container py-4">
        <div class="row gy-4 gx-5">
          <div class="col-lg-4 col-md-6">
            <h5 class="text-white mb-4">About Me</h5>
            <p class="small text-white-50">
              I'm a full-stack developer passionate about creating 
              digital experiences that are both functional and beautiful.
            </p>
          </div>
          
          <div class="col-lg-2 col-md-6">
            <h5 class="text-white mb-4">Quick Links</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <a href="#home" class="text-white-50 text-decoration-none">Home</a>
              </li>
              <li class="mb-2">
                <a href="#about" class="text-white-50 text-decoration-none">About</a>
              </li>
              <li class="mb-2">
                <a href="#skills" class="text-white-50 text-decoration-none">Skills</a>
              </li>
              <li class="mb-2">
                <a href="#projects" class="text-white-50 text-decoration-none">Projects</a>
              </li>
              <li class="mb-2">
                <a href="#contact" class="text-white-50 text-decoration-none">Contact</a>
              </li>
            </ul>
          </div>
          
          <div class="col-lg-3 col-md-6">
            <h5 class="text-white mb-4">Contact</h5>
            <p class="small text-white-50">
              <i class="bi bi-geo-alt me-2"></i>City, Country
            </p>
            <p class="small text-white-50">
              <i class="bi bi-envelope me-2"></i>your.email@example.com
            </p>
            <p class="small text-white-50">
              <i class="bi bi-phone me-2"></i>+1 234 567 890
            </p>
          </div>
          
          <div class="col-lg-3 col-md-6">
            <h5 class="text-white mb-4">Follow Me</h5>
            <div class="social-icons d-flex justify-content-center justify-content-md-start">
              <a href="#" class="me-3"><i class="bi bi-github"></i></a>
              <a href="#" class="me-3"><i class="bi bi-linkedin"></i></a>
              <a href="#" class="me-3"><i class="bi bi-twitter"></i></a>
              <a href="#"><i class="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.2)"}}>
        <span class="text-white-50 small">© 2023 Your Name. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;  