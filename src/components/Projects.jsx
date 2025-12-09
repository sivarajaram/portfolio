// src/components/Projects.jsx
import React from "react";
import ProjectCard from "./ProjectCard";
import "./projects.css";

const PROJECTS = [
  {
    id: 1,
    title: "URL Shortener",
    description: "Spring Boot application to shorten long URLs.",
    tech: "Java, Spring Boot, MySQL",
    image: "/projects/url.png",
  },
  {
    id: 2,
    title: "Food Delivery Website",
    description: "React frontend with filters, cart, search functionality.",
    tech: "React, Redux",
    image: "/projects/food.png",
  },
  {
    id: 3,
    title: "Video Calling App",
    description: "Real-time communication using WebRTC.",
    tech: "React, WebRTC",
    image: "/projects/video.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-title">Main Projects</h2>

      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tech={project.tech}
            image={project.image}
          />
        ))}
      </div>
    </section>
  );
}
