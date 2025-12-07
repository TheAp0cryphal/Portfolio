import ScrollReveal from "./ScrollReveal";

interface TimelineItem {
  startYear: string;
  endYear: string;
  title: string;
  company: string;
  description: ({ type: string; content: string; url?: string } | string)[];
  logo?: string;
}

const Timeline = () => {
  return (
    <div class="container py-5">
      <div class="text-center mb-5">
        <h2 class="section-title">Professional Experience</h2>
      </div>
      <div class="timeline">
        {([
          {
            startYear: "November 2025",
            endYear: "Present",
            title: "Software Developer",
            company: "Dayforce",
            description: ["Building the world's best strategic workforce planning software."],
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKrC2g1BreoMxffTjIozgDhRzgA__mAN_Cw&amp;s"
          },
          {
            startYear: "May 2025",
            endYear: "November 2025",
            title: "Product Software Engineer",
            company: "Agentnoon",
            description: ["Intuitive AI-native org design platform for building the workforce of the future."],
            logo: "https://lh3.googleusercontent.com/p/AF1QipOhfmZ2fNY5tKC-rLA6hyqZWtFzJ-3b8sMp1j1i=s1360-w1360-h1020-rw"
          },
          {
            startYear: "September 2024",
            endYear: "April 2025",
            title: "Working on something cool with LLMs in Education",
            company: "Independent Stealth Initiative 🤫",
            description: [],
            logo: "https://media.licdn.com/dms/image/v2/C4E0BAQHMGqnlWxYhYw/company-logo_200_200/company-logo_200_200/0/1630589017221?e=2147483647&v=beta&t=vkzthj8vACOWSp5rXgMROAwcuVNZPgsXwtulzrVFZ3w"
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
            logo: "https://yt3.googleusercontent.com/1f0Y_lcNtQP2GdPcl-p26tMhlN_3ABtLdkZW96BjsPpRGaZPZO0lloduzM-bGgn4hLc70uHnlQ=s900-c-k-c0x00ffffff-no-rj"
          },
          {
            startYear: "January 2023",
            endYear: "April 2024",
            title: "Software Engineering Co-op",
            company: "Rivian Automotive Inc.",
            description: [
              {
                type: 'text', content: `New Rear Screen Display - Spotlight Infotainment Project for Q1 2024 shipped to 100,000+ users pre-releasing OTA by 4 weeks.
                
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
            logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Rivian_Logo_Mark_Gold.png"
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
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcwCtmq0hcH_4aRFgeBqqFDr2VHlZOyRekQA&s"
          },
          {
            startYear: "April 2022",
            endYear: "September 2022",
            title: "Automation Developer",
            company: "Press Monitor",
            description: [
              { type: 'text', content: 'Developed Python automation scripts to categorize news content using AI-based real-time video stream segmentation' },
            ],
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC34ibdO77aCWmgSVzLZ51RWDXK68-3fTQQ&s"
          },
        ] as TimelineItem[]).map((item, index) => (
          <ScrollReveal class={`timeline-item ${index % 2 === 0 ? 'from-left' : 'from-right'}`}>
            <div class="timeline-marker">
              {item.logo ? (
                <img src={item.logo} alt={`${item.company} logo`} />
              ) : (
                <span>{item.company.charAt(0)}</span>
              )}
            </div>
            <div class="timeline-badge">{item.startYear} - {item.endYear}</div>
            <div class="timeline-content shadow-sm p-4">
              <h4><b>{item.company}</b></h4>
              <h6 class="text-warning">{item.title}</h6>
              {item.description.map((desc) => (
                typeof desc === 'string' ? <p>{desc}</p> :
                  desc.type === 'text' ? <p style={{ 'white-space': 'pre-line' }}>{desc.content}</p> :
                    desc.type === 'video' ? (
                      <div class="ratio ratio-16x9">
                        <iframe
                          src={`https://www.youtube.com/embed/${desc.url}`}
                          title={item.title}
                          loading="lazy"
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
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 