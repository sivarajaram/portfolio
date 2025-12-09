// src/components/Hero.jsx
export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-text">SIVANANDAN</div>

      <div className="hero-inner">
        {/* LEFT SIDE */}
        <div className="hero-left">
          <p className="hero-hello">Hello,</p>

          <h1 className="hero-name">
            I'm <span>Sivanandan</span>
          </h1>

          <h2 className="hero-role">Full Stack Developer</h2>

          <p className="hero-desc">
            I build modern, responsive web applications using Java, Spring Boot
            and React.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="hero-btn-primary">Contact Me</a>
            <a href="/Siva-Resume.pdf" download className="hero-btn-secondary">
              Download Resume
            </a>
          </div>
        </div>

        {/* RIGHT SIDE — ONLY IMAGE + BADGES */}
        <div className="hero-right">
          <img src="/siva.png" alt="Siva" className="hero-photo" />

          <div className="hero-tech hero-tech-1">React</div>
          <div className="hero-tech hero-tech-2">Spring Boot</div>
          <div className="hero-tech hero-tech-3">Java</div>
          <div className="hero-tech hero-tech-4">SQL</div>
        </div>
      </div>
    </section>
  );
}
