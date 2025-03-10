import { For } from "solid-js";

const Skills = () => {
  const skillsData = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "TypeScript", level: 70 },
    { name: "SQL/NoSQL", level: 65 },
  ];

  return (
    <div class="container">
      <div class="text-center mb-5">
        <h2>My Skills</h2>
      </div>
      
      <div class="row">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h3 class="mb-4">Technical Expertise</h3>
          <For each={skillsData}>
            {(skill) => (
              <div class="skill-item">
                <div class="d-flex justify-content-between mb-1">
                  <span class="fw-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style={{ width: `${skill.level}%` }}
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            )}
          </For>
        </div>
        <div class="col-lg-6">
          <h3 class="mb-4">Services I Offer</h3>
          <div class="row g-4">
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body">
                  <div class="text-primary mb-3">
                    <i class="bi bi-code-square fs-3"></i>
                  </div>
                  <h5 class="card-title">Web Development</h5>
                  <p class="card-text">
                    Building responsive and performant web applications with modern technologies.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body">
                  <div class="text-primary mb-3">
                    <i class="bi bi-phone fs-3"></i>
                  </div>
                  <h5 class="card-title">Mobile Apps</h5>
                  <p class="card-text">
                    Creating cross-platform mobile applications that work on any device.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body">
                  <div class="text-primary mb-3">
                    <i class="bi bi-server fs-3"></i>
                  </div>
                  <h5 class="card-title">Backend Solutions</h5>
                  <p class="card-text">
                    Developing robust server-side applications and APIs.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body">
                  <div class="text-primary mb-3">
                    <i class="bi bi-bezier2 fs-3"></i>
                  </div>
                  <h5 class="card-title">UI/UX Design</h5>
                  <p class="card-text">
                    Crafting intuitive and engaging user interfaces and experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
