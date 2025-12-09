// src/components/Skillcard.jsx
import { useState } from "react";

function Skillcard({ name, image }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`skill-card ${isActive ? "skill-card-active" : ""}`}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      <img src={image} alt={name} className="skill-icon" />
      <h4>{name}</h4>
    </div>
  );
}

export default Skillcard;
