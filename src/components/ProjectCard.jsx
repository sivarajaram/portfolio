// src/components/ProjectCard.jsx
import React from "react";

function ProjectCard({ title, description, tech, image }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-img" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>Tech:</strong> {tech}</p>
    </div>
  );
}

export default ProjectCard;
