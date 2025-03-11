const Home = () => {
  return (
    <div class="container text-center fade-in">
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-6 text-lg-start">
          <div class="profile-img-container mx-auto profile-image m-4 profile" style={{"max-width": "250px"}}>
            <img
              src="/assets/profile_image.jpg"
              alt="Profile"
              class="img-fluid rounded-circle"
            />
          </div>
          <h1 class="display-4 fw-bold mb-4 text-center">Hi, I'm <span class="name">Tanishk</span></h1>
          <p class="lead mb-4 text-center">
            I am a <span class="marked-text">software generalist. </span>
            I am passionate about working with complex software at <span class="marked-text">scale.</span>
          </p>
          <div class="d-flex gap-3 justify-content-center">
            <a href="#projects" class="btn btn-primary black-text">
              View My Work
            </a>
            <a href="#contact" class="btn btn-outline-primary">
              Contact Me
            </a>
          </div>            
        </div>
      </div>
    </div>
  );
};

export default Home;