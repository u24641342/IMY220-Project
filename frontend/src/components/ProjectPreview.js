import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectPreview.css';

function ProjectPreview({ project }) {
  return (
    <div className="project-card">
      <div className="project-card-top">
        <img src={project.image} alt={project.name} className="project-img" />
        <span className="details-icon" title="More details">&#8942;</span>
      </div>
      <div className="project-name">
        <Link to="/project" className="project-link">{project.name}</Link>
      </div>
      <div className="project-stats-row">
        <div className="project-stat">
          <div className="divider white-divider" />
          <div className="stat-label">Recent changes</div>
          <div className="stat-value">{project.changes}</div>
        </div>
        <div className="project-stat">
          <div className="divider white-divider" />
          <div className="stat-label">Recent checkouts</div>
          <div className="stat-value">{project.checkouts}</div>
        </div>
        <div className="project-stat">
          <div className="divider white-divider" />
          <div className="stat-label">Total commits</div>
          <div className="stat-value">{project.commits}</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPreview;