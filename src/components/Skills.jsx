import "./Skills.css";

const skillsData = [
  { name: "Java", level: 85, img: "/skills/java.png.png" },
  { name: "Spring Boot", level: 80, img: "/skills/spring.png" },
  { name: "React", level: 75, img: "/skills/react.png" },
  { name: "JavaScript", level: 70, img: "/skills/js.png.png" },
  { name: "SQL", level: 78, img: "/skills/sql.png" },
  { name: "MongoDB", level: 65, img: "/skills/mdb.png" },
  { name: "AWS", level: 60, img: "/skills/aws.png.png" },
  { name: "Python", level: 55, img: "/skills/python.png" },
];

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-inner">
        <h2 className="skills-title">
          My <span>Skills</span>
        </h2>

        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div
              className="skill-card"
              key={index}
              onMouseEnter={(e) => e.currentTarget.classList.add("filled")}
            >
              <img src={skill.img} alt={skill.name} className="skill-img" />

              <h3 className="skill-name">{skill.name}</h3>

              <div className="skill-bar-bg">
                <div
                  className="skill-bar-fill"
                  style={{ "--level": `${skill.level}%` }}
                />
              </div>

              <p className="skill-level-text">{skill.level}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
