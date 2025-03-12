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
      title: "Auto-Encoders",
      subtitle: "Dimensionality Reduction | Variation Auto-Encoders",
      description:
        "Created a set of autoencoder models, including both vanilla and variational versions, using simple one-layer architectures with ReLU activations. The goal is to explore unsupervised learning by compressing data into a compact representation and then reconstructing it",
      image: "./assets/autoencoder.png",
      tags: ["React", "API", "CSS"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/ML---Clustering-Unknown-Facial-Data-Action-Units",
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
      tags: ["Android", "Kotlin"],
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
    {
      category: "Mobile Development",
      title: "My Running Tracker",
      subtitle: "A running tracking app",
      description:
        "This app allows users to track and save their running sessions, it is able to automatically identify the activity the user is engaged in using Weka Classifier based on the phone's gyroscopic data",
      image: "./assets/running_tracker.jpg",
      tags: ["Android", "Kotlin"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/1Food",
    },
    {
      category: "Web / Backend",
      title: "Hoggett",
      subtitle: "An animal tracking web app",
      description:
        "This web application allows a farmer to track his various types of pigs. If he loses a pig, and it is found somewhere else in the city, finders can share the coordinates directly with the farmer on MapBox as a marker location. The list reloads without refetching the page",
      image: "./assets/hogget.png",
      tags: ["TypeScript", "NPM", "Node.js", "MapBox", "MVC", "HTML", "CSS", "Bootstrap 5"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/Hoggett",
    },
    {
      category: "Web / Backend",
      title: "Music Industry Management System",
      subtitle: "Relational Database in MSSQL",
      description:
        "MusicDB is a MSSQL database application designed to manage the complex relationships in the music industry ecosystem. The system tracks the many-to-many relationships between musicians and artists (bands/groups), maintains song catalogs with proper attribution, and enforces business rules that reflect real-world music industry practices.",
      image: "./assets/database.png",
      tags: ["SQL", "MS SQL Server"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/1Food",
    },
    {
      category: "Web / Backend",
      title: "Task Manager",
      subtitle: "Java based CRUD app with MongoDB",
      description:
        "This app utilizes MongoDB and Spring Boot to build a CRUD app with Database, Backend and Docker containerization",
      image: "",
      tags: ["Java", "SpringBoot", "MongoDB", "Docker"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/1Food",
    },
    {
      category: "Systems / Low Level",
      title: "Reconstructing 3D from 2D source",
      subtitle: "Stereo Reconstruction",
      description:
        "No Libraries, only pure math! \n Theory: https://w.wiki/DQ8e \n\n I perform some tricks to get the ability to transform an airplane from a 2D image to a 3D representation. (Understanding the \"depth\" of the 2D image. Pun intended)",
      image: "./assets/stereo_reconstruction.jpeg",
      tags: ["MATLAB"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/EdgeDetection---Depth-Analysis---Creating-3D-Model-of-a-2D-source",
    },
    {
      category: "Systems / Low Level",
      title: "Augmented Reality Filter",
      subtitle: "Real-time Superimposition",
      description:
        "No libraries were used, only pure math! \n\nWe take a video with constantly changing perspectives, learning where the edge's for the book are and what are it's dimensions to successfully impose a live video over it. \nTechniques: Brief, Surf, RANSAC, Image Stitching",
      image: "https://user-images.githubusercontent.com/70075553/180334468-c0a89cc5-c140-4a47-b5f9-1883fc1eb785.mp4",
      tags: ["MATLAB"],
      demo: "#",
      code: "https://github.com/TheAp0cryphal/AugmentedRealityFilter---Imposing-Augmentation-on-Book-Cover",
    }  
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

      <div class="nav-grid text-center mb-5 justify-content-center align-items-center">
        <button onClick={prevCategory} class="nav-btn btn">
          <span class="me-2 mb-1 arrow" style="font-size: 2.5em;">&lt;</span>
          <span class="nav-text">{prevCategoryName()}</span>
        </button>
        <h3 class="category-title flex-grow-1 text-center"><b>{currentCategory()}</b></h3>
        <button onClick={nextCategory} class="nav-btn btn next-category">
          <span class="nav-text">{nextCategoryName()}</span>
          <span class="ms-2 arrow" style="font-size: 2.5em;">&gt;</span>
        </button>
      </div>

      {/* Projects Grid for Current Category */}
      <div class="row g-3">
        <For each={groupedProjects[currentCategory()]}>
          {(project) => (
            <div class="col-md-6 col-lg-4">
              <div class="card h-100 shadow-sm">
                {project.image && (
                  project.image.endsWith('.mp4') ? (
                    <video class="card-img-top" controls>
                      <source src={project.image} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={project.image} class="card-img-top" alt={project.title} />
                  )
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
