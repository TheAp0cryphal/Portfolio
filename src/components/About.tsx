const About = () => {
  return (
    <div class="container">
      <div class="text-center mb-5">
        <h2>About Me</h2>
      </div>
      <div class="row align-items-center">
        <div class="col-lg-5 mb-4 mb-lg-0">
          <div class="profile-img-container mx-auto" style={{"max-width": "350px"}}>
            <img
              src="https://via.placeholder.com/400"
              alt="Profile"
              class="img-fluid rounded-circle"
            />
          </div>
        </div>
        <div class="col-lg-7">
          <h3 class="mb-3">Who I Am</h3>
          <p class="lead mb-4">
            I'm a passionate full-stack developer with expertise in creating
            responsive web applications using modern technologies.
          </p>
          <p class="mb-4">
            With a strong foundation in both front-end and back-end development,
            I bring ideas to life through clean code and intuitive user experiences.
            I enjoy solving complex problems and continuously learning new skills.
          </p>

        </div>
      </div>
    </div>
  );
};

export default About;
  