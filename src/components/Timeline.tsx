const Timeline = () => {
  return (
    <div class="container py-5">
      <h2 class="text-center mb-5">Experience</h2>
      <div class="timeline">
        {[
          {
            year: "2023",
            title: "Senior Developer",
            company: "Tech Corp",
            description: "Led development of enterprise applications",
          },
          {
            year: "2021",
            title: "Full Stack Developer",
            company: "StartUp Inc",
            description: "Built scalable web applications",
          },
          {
            year: "2019",
            title: "Junior Developer",
            company: "Code Co",
            description: "Developed frontend features",
          },
        ].map((item) => (
          <div class="timeline-item">
            <div class="timeline-badge">{item.year}</div>
            <div class="timeline-content shadow-sm p-4">
              <h4>{item.title}</h4>
              <h6 class="text-muted">{item.company}</h6>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 