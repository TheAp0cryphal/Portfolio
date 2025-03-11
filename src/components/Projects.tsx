import { For } from "solid-js";

const Projects = () => {
  const projectsData = [
    {
      title: "eMosh",
      subtitle: "Computer Vision | Human Computer Interaction",
      description:
        "A Web App with Multimodal AI that infers human emotions based on facial expressions and audio activations",
      image: "./assets/eMosh.png",
      tags: ["Flask", "Node.js", "FFmpeg"],
      demo: "#",
      code: "#",
    },
    {
      title: "Airplane Detection in Google Maps",
      subtitle: "Computer Vision - Custom CNN",
      description: "A productivity application for teams to manage projects and tasks.",
      image: "./assets/Airplane.png",
      tags: ["React", "Firebase", "Material UI"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/CNN-Airplane-Detection-in-Google-Maps-CIFAR",
    },
    {
      title: "Crypto Price Predictor",
      subtitle: "Sentiment Analysis | Web Scraping",
      description: "A responsive portfolio website to showcase projects and skills.",
      image: "./assets/crypto.png",
      tags: ["HTML", "CSS", "JavaScript"],
      demo: "#",
      code: "#",
    },
    {
      title: "Deep Dreamify",
      subtitle: "Digitally Augmented Images - Classification Challenge",
      description: "A compartive study of multiple models including Support Vector Machines, Decision Trees, Ensemble Voting and Random Forest",
      image: "./assets/whatthedogdoin.png",
      tags: ["React", "API", "CSS"],
      demo: "#",
      code: "#",
    },
    {
      title: "Emotional Inference - Phoebe from Friends!",
      subtitle: "Emotional Inference Model",
      description: "We train an AI on the Fer2013 database for emotional inference. We then try to predict phoebe's emotions using snapshots from the show F.R.I.E.N.D.S",
      image: "./assets/phoebe.png",
      tags: ["React", "API", "CSS"],
      demo: "#",
      code: "#",
    },
  ];

  return (
    <div class="container py-5">
      <div class="text-center mb-4">
        <h2>My Projects</h2>
      </div>
      <h3 class="mb-4">AI/ML Development</h3>
      <div class="row g-4">
        <For each={projectsData}>
          {(project) => (
            <div class="col-md-6 col-lg-4">
              <div class="card h-100 shadow-sm">
                <img src={project.image} class="card-img-top" alt={project.title} />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title"><b>{project.title}</b></h5>
                  <h6 class="card-subtitle mb-2 font-weight-light"><small>{project.subtitle}</small></h6>
                  <p class="card-text flex-grow-3">{project.description}</p>
                  <div class="d-flex flex-wrap gap-2 mb-3">
                    <For each={project.tags}>
                      {(tag) => <span class="badge bg-secondary">{tag}</span>}
                    </For>
                  </div>
                  <div class="d-flex gap-2 mt-auto">
                    <a href={project.demo} class="btn btn-light btn-sm">Live Demo</a>
                    <a href={project.code} class="btn btn-outline-primary btn-sm">View Code</a>
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