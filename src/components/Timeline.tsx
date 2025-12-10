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
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    if (parts.length >= 2) {
      const month = parts[0].substring(0, 3).toUpperCase();
      const year = parts[1].slice(0);
      return {
        month, year: + year
      };
    }
    return { month: '', year: dateStr }; // Fallback
  };

  return (
    <div class="container-fluid py-5">
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
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKrC2g1BreoMxffTjIozgDhRzgA__mAN_Cw&s"
          },
          {
            startYear: "May 2025",
            endYear: "November 2025",
            title: "Product Software Engineer",
            company: "Agentnoon",
            description: ["Intuitive AI-native org design platform for building the workforce of the future."],
            logo: "https://media.licdn.com/dms/image/v2/D560BAQF7biiMvgsOOA/company-logo_200_200/company-logo_200_200/0/1692382941628/agentnoon_logo?e=2147483647&v=beta&t=nl_740egw1F0CPKWK9DDdOIeN5K_KdscGPLoQhexpx8"
          },
          {
            startYear: "September 2024",
            endYear: "April 2025",
            title: "Founder",
            company: "Solo Stealth Initiative",
            description: ["Working on something cool with LLMs in Education"],
            logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEHs1C2gRRukA/company-logo_200_200/company-logo_200_200/0/1630652289773/stealth_startup_tlv_logo?e=1766620800&v=beta&t=PY-ML_4nVqZyqGMKhU2sFDgiL2MBbfv9qWWwxc-CmZ8"
          },
          {
            startYear: "May 2024",
            endYear: "September 2024",
            title: "GenAI Application Developer",
            company: "Centre of Digital Media",
            description: [
              { type: 'text', content: 'Built a GenAI application where an LLM behaves like a "GOD" influencing the game state in real time.' },
              { type: 'video', url: 'L_jhwsPwRDY' }
            ],
            logo: "https://yt3.googleusercontent.com/1f0Y_lcNtQP2GdPcl-p26tMhlN_3ABtLdkZW96BjsPpRGaZPZO0lloduzM-bGgn4hLc70uHnlQ=s900-c-k-c0x00ffffff-no-rj"
          },
          {
            startYear: "January 2023",
            endYear: "April 2024",
            title: "Software Engineer Co-op",
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
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/SFU-block-logo.svg/2560px-SFU-block-logo.svg.png"
          },
          {
            startYear: "April 2022",
            endYear: "September 2022",
            title: "Automation Developer",
            company: "Press Monitor",
            description: [
              { type: 'text', content: 'Developed Python automation scripts to categorize news content using AI-based real-time video stream segmentation' },
            ],
            logo: "https://awsmp-logos.s3.amazonaws.com/seller-yax3sv3tx2agu/8ff497a3e87e0d09081d2b5235fcbebc.png"
          },
        ] as TimelineItem[]).map((item, index) => {
          const dateObj = formatDate(item.startYear);
          return (
            <ScrollReveal class={`timeline-row ${index % 2 === 0 ? 'row-left' : 'row-right'}`}>
              <div class="timeline-meta">
                <div class="date-stack">
                  <span class="date-month">{dateObj.month}</span>
                  <span class="date-year">{dateObj.year}</span>
                </div>
                <div class="meta-logo-wrapper">
                  {item.logo ? (
                    <img src={item.logo} alt={`${item.company} logo`} class="meta-logo" />
                  ) : (
                    <span class="meta-initial">{item.company.charAt(0)}</span>
                  )}
                </div>
                <h3 class="meta-company">{item.company}</h3>
              </div>

              <div class="timeline-body glass-panel">
                <h4 class="body-title">{item.title}</h4>
                <div class="body-content">
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
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;