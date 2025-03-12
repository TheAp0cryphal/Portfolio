import { For, createSignal } from "solid-js";

const Projects = () => {
  const projectsData = [
    {
      category: "AI/ML Development",
      title: "eMosh",
      subtitle: "Computer Vision | Human Computer Interaction",
      description:
        "A Web App with Multimodal AI that infers human emotions based on facial expressions and audio activations",
      image: "./assets/eMosh.png",
      tags: ["Flask", "Node.js", "FFmpeg", "TensorFlow"],
      demo: "#",
      code: "#",
    },
    {
      category: "AI/ML Development",
      title: "Airplane Detection in Google Maps",
      subtitle: "Computer Vision - Custom CNN",
      description:
        "A productivity application for teams to manage projects and tasks.",
      image: "./assets/Airplane.png",
      tags: ["React", "Firebase", "Material UI"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/CNN-Airplane-Detection-in-Google-Maps-CIFAR",
    },
    {
      category: "AI/ML Development",
      title: "Crypto Price Predictor",
      subtitle: "Sentiment Analysis | Web Scraping",
      description:
        "We perform sentiment analysis on reddit comments about crypto. We merge it with fear and greed index to determine the upcoming crypto price and how close the currencies are intertwined.",
      image: "./assets/crypto.png",
      tags: ["HTML", "CSS", "JavaScript"],
      demo: "#",
      code: "#",
    },
    {
      category: "AI/ML Development",
      title: "Deep Dreamify",
      subtitle: "Digitally Augmented Images - Classification Challenge",
      description:
        "A compartive study of multiple models including Support Vector Machines, Decision Trees, Ensemble Voting and Random Forest",
      image: "./assets/whatthedogdoin.png",
      tags: ["React", "API", "CSS"],
      demo: "#",
      code: "#",
    },
    {
      category: "AI/ML Development",
      title: "Emotional Inference - Phoebe from Friends!",
      subtitle: "Emotional Inference Model",
      description:
        "We train an AI on the FER2013 database for emotional inference. We then try to predict phoebe's emotions using snapshots from the show F.R.I.E.N.D.S",
      image: "./assets/phoebe.png",
      tags: ["React", "API", "CSS"],
      demo: "#",
      code: "#",
    },
    {
      category: "AI/ML Development",
      title: "Data Clustering Unlabelled Data",
      subtitle: "PCA | Dimensionality Reduction | KMeans",
      description:
        "Data Clustering of unknown images to identify existing number of classes of data that closely resemble each other.",
      image: "./assets/cluster.png",
      tags: ["React", "API", "CSS"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/ML---Clustering-Unknown-Facial-Data-Action-Units",
    },
    {
      category: "AI/ML Development",
      title: "Handwritten Digit Recognition",
      subtitle: "Convoluted Neural Network",
      description:
        "A model to recognize handwritten digits, trained on the MNIST dataset",
      image: "./assets/mnist.jpg",
      tags: ["React", "API", "CSS"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/ML---Clustering-Unknown-Facial-Data-Action-Units",
    },
    {
      category: "Mobile Development",
      title: "1Food",
      subtitle: "QR based auto-queuing service for businesses",
      description:
        "Features:\n - Pager System (Scan QR ✔) \n - Queue Tracking  \n - Login and Registration / User Profile \n - Nearby Restaurants Info (Google API) \n - Recommendation Engine for Cuisines \n - Favorites \n - Language Support (French & Mandarin)",
      image: "./assets/1Food.png",
      tags: ["Android", "Firebase", "Kotlin", "Java", "MVVM"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/1Food",
    },
    {
      category: "Mobile Development",
      title: "Podcasts App",
      subtitle: "An app to manage and view podcasts",
      description:
        "The app allows you to browse and view information on available podcasts",
      image: "./assets/podcasts.png",
      tags: ["Android", "Firebase", "Kotlin", "Java", "MVVM"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/1Food",
    },
    {
      category: "Mobile Development",
      title: "MineSeeker",
      subtitle: "A mine-seeking game",
      description:
        "Within a grid, scan blocks and find all the mines in least number of scans",
      image: "./assets/mineseeker.png",
      tags: ["Android", "Java"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/1Food",
    },
    {
      category: "Mobile Development",
      title: "Game-Over!",
      subtitle: "6 Hour SFU Hackathon",
      description:
        "A text based game that lets your traverse the map via text. The tasks involve making decision in certain situations. Making the right decision will allow you to proceed to finish all 5 tasks, a wrong choice, however, restarts the game",
      image: "./assets/game-over.png",
      tags: ["Android", "Java"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/1Food",
    },
  ];

  // Group projects by category
  const groupedProjects = projectsData.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {});

  // Create a categories array from the keys of groupedProjects
  const categories = Object.keys(groupedProjects);

  // Set up a signal for the current category index
  const [currentCategoryIndex, setCurrentCategoryIndex] = createSignal(0);

  const nextCategory = () =>
    setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
  const prevCategory = () =>
    setCurrentCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);

  const currentCategory = () => categories[currentCategoryIndex()];
  const prevCategoryName = () =>
    categories[(currentCategoryIndex() - 1 + categories.length) % categories.length];
  const nextCategoryName = () =>
    categories[(currentCategoryIndex() + 1) % categories.length];

  return (
    <div class="container my-5">
      <div class="text-center mb-5">
        <h2>My Projects</h2>
      </div>

      <div class="d-flex align-items-center justify-content-center mb-4">
        <button onClick={prevCategory} class="nav-btn btn d-flex align-items-center">
          <span class="me-2 arrow">&larr;</span>
          <span class="d-none d-md-inline">{prevCategoryName()}</span>
        </button>
        <h3 class="px-5 mt-1"><b>{currentCategory()}</b></h3>
        <button onClick={nextCategory} class="nav-btn btn d-flex align-items-center">
          <span class="d-none d-md-inline me-2">{nextCategoryName()}</span>
          <span class="arrow">&rarr;</span>
        </button>
      </div>

      {/* Projects Grid for Current Category */}
      <div class="row g-3">
        <For each={groupedProjects[currentCategory()]}>
          {(project) => (
            <div class="col-md-6 col-lg-4">
              <div class="card h-100 shadow-sm">
                {project.image && (
                  <img src={project.image} class="card-img-top" alt={project.title} />
                )}
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title"><b>{project.title}</b></h5>
                  <h6 class="card-subtitle mb-2 font-weight-light">
                    <small>{project.subtitle}</small>
                  </h6>
                  <p class="card-text flex-grow-3">
                    {project.description.split("\n").map((line) => (
                      <>
                        {line}
                        <br />
                      </>
                    ))}
                  </p>
                  <div class="d-flex flex-wrap gap-2 mb-3">
                    <For each={project.tags}>
                      {(tag) => <span class="badge bg-secondary">{tag}</span>}
                    </For>
                  </div>
                  <div class="d-flex gap-2 mt-auto">
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
