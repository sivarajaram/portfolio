// src/components/About.jsx
import React from "react";
import ScrambledText from "./ScrambledText";
import "./About.css";

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner two-column">
        {/* LEFT SIDE */}
        <div className="about-left">
          <h2 className="about-heading">About Me</h2>

          <ScrambledText className="about-paragraph">
            I’m Sivanandan-Full Stack Developer focused on building scalable and secure
            backend systems using Java ,Spring Boot, while crafting responsive,
            accessible,& high performance user interfaces with React. I enjoy designing
            clean APIs, optimizing application performance, and transforming
            complex real world problems into reliable software solutions. My approach blends
            strong system design principles, efficient coding practices, and a user first
            mindset. I am driven by continuous learning and enjoy working on products that
            deliver real value, long term stability, and smooth user experiences across
            platforms.
          </ScrambledText>

          <a className="btn-primary" href="#projects">
            View Projects
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div className="tech-card hover-card">
          <h4>Top Tech Stack</h4>
          <div className="tech-list">
            <span>Java</span>
            <span>Spring Boot</span>
            <span>React</span>
            <span>REST APIs</span>
            <span>AWS</span>
            <span>SQL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
