import { For } from "solid-js";

const Projects = () => {
  const projectsData = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with payment integration and admin dashboard.",
      image: "https://via.placeholder.com/600x400",
      tags: ["React", "Node.js", "MongoDB"],
      demo: "#",
      code: "#"
    },
    {
      title: "Task Management App",
      description: "A productivity application for teams to manage projects and tasks.",
      image: "https://via.placeholder.com/600x400",
      tags: ["React", "Firebase", "Material UI"],
      demo: "#",
      code: "#"
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website to showcase projects and skills.",
      image: "https://via.placeholder.com/600x400",
      tags: ["HTML", "CSS", "JavaScript"],
      demo: "#",
      code: "#"
    },
    {
      title: "Weather Application",
      description: "A weather forecasting app that provides real-time weather information.",
      image: "https://via.placeholder.com/600x400",
      tags: ["React", "API", "CSS"],
      demo: "#",
      code: "#"
    }
  ];

  return (
    <div class="container">
      <div class="text-center mb-5">
        <h2>My Projects</h2>
      </div>
      
      <div class="row g-4">
        <For each={projectsData}>
          {(project) => (
            <div class="col-md-6 col-lg-6 p-4">
              <div class="card h-100">
                <img src={project.image} class="card-img-top" alt={project.title} />
                <div class="card-body">
                  <h5 class="card-title">{project.title}</h5>
                  <p class="card-text">{project.description}</p>
                  <div class="d-flex mb-3 flex-wrap">
                    <For each={project.tags}>
                      {(tag) => (
                        <span class="badge bg-secondary me-2 mb-2">{tag}</span>
                      )}
                    </For>
                  </div>
                  <div class="d-flex gap-2">
                    <a href={project.demo} class="btn btn-light btn-sm">
                      Live Demo
                    </a>
                    <a href={project.code} class="btn btn-outline-primary btn-sm">
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Projects;
