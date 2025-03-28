import { For, createSignal } from "solid-js";

const Projects = () => {
  const projectsData = [
    {
      category: "AI/ML Development",
      title: "AI-Powered Workshift Recommendation System",
      subtitle: "Reinforcement Learning | REINFORCE policy | NLP | PyTorch",
      description: (
        <>
          Developed a reinforcement learning model using the REINFORCE policy to recommend optimal workshifts for employees based on their skills, availability, and workload.
          <br /> 
          <br /> ● Utilized NLP to process employee messages for shift cancellations
          <br /> ● Reduce overtime expenses by penalizing assignments that exceed 8 hours
          <br /> ● Recommend dynamic replacements for employees who cancel shifts using ML based ranking
          <br /> ● Fairness & transparency in workforce allocation using a point-based system that rewards employee adherence.
        </>
      ),
      image: "./assets/workshift.png",
      tags: ["Python", "PyTorch", "NLP", "Reinforcement Learning"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/Workshift-Recommendation-System",
    },
    {
      category: "AI/ML Development",
      title: "eMosh",
      subtitle: "Computer Vision | Human Computer Interaction",
      description: (
        <>
          In human computer interaction, we use facial features and audio arousal to determine the user's current emotional state. We then map it to an appropriate emoji :D
          <br /><br />
          ● Utilized FFmpeg, Python to develop a pipeline for capturing peak emotion frames from A/V channels separately
          <br /> <br />
          ● Created a multi-processing solution to concurrently process images with dynamic bounding boxes, improving speeds by 3x
        </>
      ),
      image: "./assets/eMosh.png",
      tags: ["Python", "Flask", "Node.js", "FFmpeg", "PyTorch"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/eMosh-Emotional-Multimodality-Optical-Auditory-Synergy-Hub",
    },
    {
      category: "AI/ML Development",
      title: "Airplane Detection in Google Maps",
      subtitle: "Computer Vision - Custom CNN",
      description: (
        <>
          Training a CNN built from scratch on the CIFAR dataset, we are able to recognize airplane's in google images irrespective of the angle or size they are.
          <br /> <br />
          Model Accuracy: 86.10%
        </>
      ),
      image: "./assets/Airplane.png",
      tags: ["Python", "PyTorch"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/CNN-Airplane-Detection-in-Google-Maps-CIFAR",
    },
    {
      category: "AI/ML Development",
      title: "Crypto Price Predictor",
      subtitle: "Sentiment Analysis | Web Scraping",
      description: (
        <>
          We perform sentiment analysis on reddit comments about crypto. We merge it with fear and greed index to determine the upcoming crypto price and 
          how close the currencies are intertwined. A comparative study of multiple models.
          <br /><br />
          Models Used: Random Forest Regression, Gradient Boosting Regression, Linear Regression, Random Forest Classification, KNN, Naive Bayes
        </>
      ),
      image: "./assets/crypto.png",
      tags: ["Python", "Seaborn", "Scikit-learn", "Keras", "Spark", "NLTK"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/CryptoPricePredictor",
    },
    {
      category: "AI/ML Development",
      title: "Deep Dreamify",
      subtitle: "Digitally Augmented Images - Classification Challenge",
      description: (
        <>
          A comparative study of multiple models including Support Vector Machines, Decision Trees, Ensemble Voting and Random Forest
        </>
      ),
      image: "./assets/whatthedogdoin.png",
      tags: ["Python", "Jupyter", "Keras"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/DeepDreamify-CMPT310",
    },
    {
      category: "AI/ML Development",
      title: "Emotional Inference - Phoebe from Friends!",
      subtitle: "Emotional Inference Model",
      description: (
        <>
          We train an AI on the FER2013 database for emotional inference. We then try to predict phoebe's emotions using snapshots from the show F.R.I.E.N.D.S
        </>
      ),
      image: "./assets/phoebe.png",
      tags: ["Python", "Google Colab"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/ML-FER2013-Dataset-Emotional-Inference",
    },
    {
      category: "AI/ML Development",
      title: "Auto-Encoders",
      subtitle: "Dimensionality Reduction | Variational Auto-Encoders",
      description: (
        <>
          Created a set of autoencoder models, including both vanilla and variational versions, using simple one-layer architectures with ReLU activations. 
          The goal is to explore unsupervised learning by compressing data into a compact representation and then reconstructing it
        </>
      ),
      image: "./assets/autoencoder.png",
      tags: ["Python"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/Auto-Encoders",
    },
    {
      category: "AI/ML Development",
      title: "Data Clustering Unlabelled Data",
      subtitle: "PCA | Dimensionality Reduction | KMeans",
      description: (
        <>
          Data Clustering of unknown images to identify existing number of classes of data that closely resemble each other.
        </>
      ),
      image: "./assets/cluster.png",
      tags: ["Python"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/ML---Clustering-Unknown-Facial-Data-Action-Units-",
    },
    {
      category: "AI/ML Development",
      title: "Handwritten Digit Recognition",
      subtitle: "Convoluted Neural Network",
      description: (
        <>
          A model to recognize handwritten digits, trained on the MNIST dataset
        </>
      ),
      image: "./assets/mnist.jpg",
      tags: ["MATLAB"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/CNN-MNIST-dataset-",
    },
    {
      category: "Mobile Development",
      title: "1Food",
      subtitle: "QR based auto-queuing service for businesses",
      description: (
        <>
          Features:
          <br /> ● Pager System (Scan QR ✔) 
          <br /> ● Queue Tracking  
          <br /> ● Login and Registration / User Profile 
          <br /> ● Nearby Restaurants Info (Google API) 
          <br /> ● Recommendation Engine for Cuisines 
          <br /> ● Favorites 
          <br /> ● Language Support (French & Mandarin)
        </>
      ),
      image: "./assets/1Food.png",
      tags: ["Android", "Firebase", "Kotlin", "Java", "MVVM"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/1Food",
    },
    {
      category: "Mobile Development",
      title: "Podcasts App",
      subtitle: "An app to manage and view podcasts",
      description: (
        <>
          The app allows you to browse and view information on available podcasts
        </>
      ),
      image: "./assets/podcasts.png",
      tags: ["Android", "Kotlin"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/PodcastApp",
    },
    {
      category: "Mobile Development",
      title: "MineSeeker",
      subtitle: "A mine-seeking game",
      description: (
        <>
          Within a grid, scan blocks and find all the mines in least number of scans
        </>
      ),
      image: "./assets/mineseeker.png",
      tags: ["Android", "Java"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/MineSeeker",
    },
    {
      category: "Mobile Development",
      title: "Game-Over!",
      subtitle: "6 Hour SFU Hackathon",
      description: (
        <>
          A text based game that lets your traverse the map via text. The tasks involve making decision in certain situations. 
          Making the right decision will allow you to proceed to finish all 5 tasks, a wrong choice, however, restarts the game
        </>
      ),
      image: "./assets/game-over.png",
      tags: ["Android", "Java"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/SFU-Hackathon-Game-Over-",
    },
    {
      category: "Mobile Development",
      title: "My Running Tracker",
      subtitle: "A running tracking app",
      description: (
        <>
          This app allows users to track and save their running sessions, it is able to automatically identify the activity the user 
          is engaged in using Weka Classifier based on the phone's gyroscopic data
        </>
      ),
      image: "./assets/running_tracker.jpg",
      tags: ["Android", "Kotlin"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/MyRunningTracker",
    },
    {
      category: "Web / Backend",
      title: "Hoggett",
      subtitle: "An animal tracking web app",
      description: (
        <>
          This web application allows a farmer to track his various types of pigs. If he loses a pig, and it is found somewhere else in the city, 
          finders can share the coordinates directly with the farmer on MapBox as a marker location. The list reloads without refetching the page
        </>
      ),
      image: "./assets/hogget.png",
      tags: ["TypeScript", "NPM", "Node.js", "MapBox", "MVC", "HTML", "CSS", "Bootstrap 5"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/Hoggett",
    },
    {
      category: "Web / Backend",
      title: "Portfolio",
      subtitle: "Isn't this way too meta? :D",
      description: (
        <>
          A portfolio website consisting of a starry night background that switches between day and night, 
          it has an about section, a work experience section, software's that I've built and a contact me section.
        </>
      ),
      image: "./assets/portfolio.png",
      tags: ["TypeScript", "SolidJS", "Bootstrap", "HTML", "CSS"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/TaskManager",
    },
    {
      category: "Web / Backend",
      title: "Music Industry Management System",
      subtitle: "Relational Database in MSSQL",
      description: (
        <>
          MusicDB is a MSSQL database application designed to manage the complex relationships in the music industry ecosystem. 
          The system tracks the many-to-many relationships between musicians and artists (bands/groups), 
          maintains song catalogs with proper attribution, and enforces business rules that reflect real-world music industry practices.
        </>
      ),
      image: "./assets/database.png",
      tags: ["SQL", "MS SQL Server"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/Music-Artist-Label-Relational-Databasing-MSSQL",
    },
    {
      category: "Web / Backend",
      title: "Task Manager",
      subtitle: "Java based CRUD app with MongoDB",
      description: (
        <>
          This app utilizes MongoDB and Spring Boot to build a CRUD app with Database, Backend and Docker containerization
        </>
      ),
      image: "",
      tags: ["Java", "SpringBoot", "MongoDB", "Docker"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/TaskManager",
    },
    {
      category: "Systems / Low Level",
      title: "Reconstructing 3D from 2D source",
      subtitle: "Stereo Reconstruction",
      description: (
        <>
          No Libraries, only pure math! 
          <br /> Theory: https://w.wiki/DQ8e 
          <br /><br />
          I perform some tricks to get the ability to transform an airplane from a 2D image to a 3D representation. (Understanding the "depth" of the 2D image. Pun intended)
        </>
      ),
      image: "./assets/stereo_reconstruction.jpeg",
      tags: ["MATLAB"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/EdgeDetection---Depth-Analysis---Creating-3D-Model-of-a-2D-source",
    },
    {
      category: "Systems / Low Level",
      title: "Augmented Reality Filter",
      subtitle: "Real-time Superimposition",
      description: (
        <>
          No libraries were used, only pure math! 
          <br /><br />
          We take a video with constantly changing perspectives, learning where the edge's for the book are and what are it's dimensions to successfully impose a live video over it.
        </>
      ),
      image: "https://user-images.githubusercontent.com/70075553/180334483-7aa4f375-1e79-49ed-a960-652f46076de6.mp4",
      tags: ["MATLAB", "Brief", "Surf", "RANSAC", "Image Stitching"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/AugmentedRealityFilter---Imposing-Augmentation-on-Book-Cover",
    },
    {
      category: "Systems / Low Level",
      title: "Multi-Threaded UDP Chat",
      subtitle: "Implementation for Real-Time Messaging over IPv4",
      description: (
        <>
          Communicate over a network using UDP. It employs multiple threads to handle simultaneous tasks—reading user input, sending messages, receiving messages, and displaying received messages. The program also integrates a simple encryption mechanism and custom list data structures to manage message buffers, showcasing an effective combination of socket programming, threading, and data structure manipulation.
        </>
      ),
      image: "./assets/udp.png",
      tags: ["C"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/SSHSocketChat-Terminal",
    },
    {
      category: "Systems / Low Level",
      title: "Custom 'ls' Command Implementation",
      subtitle: "Filesystem Navigation and Inode Exploration",
      description: (
        <>
          A custom re-creation of the classic Linux ls command, built using C. It showcases expertise in low-level filesystem operations by reading inode data, traversing directories recursively, and sorting directory entries. The application supports several command-line options for enhanced functionality.
        </>
      ),
      image: "",
      tags: ["C"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/CustomLSLinux",
    },
    {
      category: "Systems / Low Level",
      title: "PID Traversal",
      subtitle: "System Process and Resource Analyzer",
      description: (
        <>
          A set of three concise C programs that traverse the /proc filesystem. One module extracts and displays PIDs and their command names, another computes memory utilization from /proc/meminfo, and the third retrieves kernel and OS version details.
        </>
      ),
      image: "",
      tags: ["C"],
      demo: "",
      code: "https://github.com/TheAp0cryphal/LinuxInternalPIDtraversal",
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

  const categories = Object.keys(groupedProjects);
  const [currentCategoryIndex, setCurrentCategoryIndex] = createSignal(0);

  const updateCategoryIndex = (offset) =>
    setCurrentCategoryIndex((prev) => (prev + offset + categories.length) % categories.length);

  const currentCategory = () => categories[currentCategoryIndex()];
  const prevCategoryName = () => categories[(currentCategoryIndex() - 1 + categories.length) % categories.length];
  const nextCategoryName = () => categories[(currentCategoryIndex() + 1) % categories.length];
  const nextCategory = () => updateCategoryIndex(1);
  const prevCategory = () => updateCategoryIndex(-1);

  return (
    <div class="container-fluid">
      <div class="text-center mb-2">
        <h2>Software I've Built</h2>
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
      <div class="row g-3 project-row">
        <For each={groupedProjects[currentCategory()]}>
          {(project, index) => (
            <div class="col-md-6 col-lg-4 project-column">
              <div 
                class="card h-100 shadow-sm project-card clickable-card"
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => window.open(project.code, '_blank')}
              >
                {/* Link indicator */}
                <div 
                  class="card-link-indicator" 
                  style={{ position: 'absolute', top: '10px', right: '10px', "font-size": "1.5em" }}
                >
                  🔗
                </div>
                {project.image && (
                  project.image.endsWith('.mp4') ? (
                    <video class="card-img-top" controls autoplay>
                      <source src={project.image} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={project.image} class="card-img-top" alt={project.title} style={{ height: '300px' }} />
                  )
                )}
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title"><b>{project.title}</b></h5>
                  <h6 class="card-subtitle mb-2 font-weight-light">
                    <small>{project.subtitle}</small>
                  </h6>
                  <div class="card-description">
                    <div class="description-content">
                      <p class="card-text flex-grow-3">
                        {project.description}
                      </p>
                      <div class="d-flex flex-wrap gap-1 mb-3 mt-2">
                        <For each={project.tags}>
                          {(tag) => <span class="badge bg-secondary">{tag}</span>}
                        </For>
                      </div>
                    </div>
                  </div>
                  <div class="description-fade"></div>
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