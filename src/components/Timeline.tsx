const Timeline = () => {
  return (
    <div class="container py-5">
      <div class="text-center mb-5">
        <h2>Professional Experience</h2>
      </div>
      <div class="timeline">
        {[
          {
            startYear: "September 2024",
            endYear: "Present",
            title: "Working on something cool with LLMs in Education",
            company: "Independent Stealth Initiative 🤫",
            description: [],
          },
          {
            startYear: "May 2024",
            endYear: "September 2024",
            title: "GenAI Application Developer",
            company: "Centre for Digital Media",
            description: [
              { type: 'text', content: 'Built a GenAI application where an LLM behaves like a "GOD" influencing the game state in real time.' },
              { type: 'video', url: 'L_jhwsPwRDY' }
            ],
          },
          {
            startYear: "January 2023",
            endYear: "April 2024",
            title: "Software Engineering Co-op",
            company: "Rivian Automotive Inc.",
            description: [
              { type: 'text', content: `New Rear Screen Display - Spotlight Infotainment Project for Q1 2024 shipped to 100,000+ users pre-releasing OTA by 4 weeks.
                
                Features: 
                ● Media Playback
                ● Playlist Queue
                ● HVAC Controls
                ● Bluetooth Settings
                ● Hotspot Settings
                ● Navigation View
                ● Lighting Controls` 
              },
              { type: 'video', url: 'dcW3yddViQY?start=442' }
            ],
          },
          {
            startYear: "September 2022",
            endYear: "December 2022",
            title: "Android Software Developer",
            company: "SFU & King's College London",
            description: [
              { type: 'text', content: 'The Cradle Platform is designed to support health care delivery for pregnant women and other patients in developing countries, with a focus on the Bidi Bidi refugee settlement in Uganda and health centres across Sierra Leone. SFU Software Systems and Computer Science students have worked with members of Kings College London to design and implement the platform. ' },
              { type: 'image', url: './assets/cradle.jpeg' }
            ],
          },
          {
            startYear: "April 2022",
            endYear: "September 2022",
            title: "Automation Developer",
            company: "Press Monitor",
            description: [
              { type: 'text', content: 'Developed Python automation scripts to categorize news content using AI-based real-time video stream segmentation' },
            ],
          },
        ].map((item) => (
          <div class="timeline-item">
            <div class="timeline-badge">{item.startYear} - {item.endYear}</div>
            <div class="timeline-content shadow-sm p-4">
              <h4><b>{item.company}</b></h4>
              <h6 class="text-warning">{item.title}</h6>
              {item.description.map((desc) => (
                desc.type === 'text' ? <p style={{ 'white-space': 'pre-line' }}>{desc.content}</p> : 
                desc.type === 'video' ? (
                  <div class="ratio ratio-16x9">
                    <iframe 
                      src={`https://www.youtube.com/embed/${desc.url}`} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
                    </iframe>
                  </div>
                ) : desc.type === 'image' && (
                  <div class="image-container pt-2">
                    <a href={desc.url} target="_blank" rel="noopener noreferrer">
                      <img src={desc.url} alt="Timeline image" class="img-fluid" />
                    </a>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 