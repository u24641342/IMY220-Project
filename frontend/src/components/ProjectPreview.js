import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectPreview.css';

function ProjectPreview({ project, onDelete }) {
  // Calculate some stats from the project data
  const checkInsCount = project.checkIns ? project.checkIns.length : 0;
  const membersCount = (project.members ? project.members.length : 0) + 1; // +1 for owner
  const createdDate = new Date(project.createdAt);
  const daysSinceCreated = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="project-card">
      <div className="project-card-top">
        <img 
          src={project.image || '/assets/images/project.png'} 
          alt={project.name} 
          className="project-img" 
        />
        <div className="project-actions">
          <span className="details-icon" title="More details">&#8942;</span>
          {onDelete && (
            <button
              className="delete-project-btn"
              onClick={(e) => {
                e.preventDefault();
                onDelete(project);
              }}
              title="Delete Project"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      <div className="project-name">
        <Link to={`/project/${project._id}`} className="project-link">
          {project.name}
        </Link>
      </div>
      <div className="project-description">
        {project.description}
      </div>
      <div className="project-stats-row">
        <div className="project-stat">
          <div className="divider white-divider" />
          <div className="stat-label">Check-ins</div>
          <div className="stat-value">{checkInsCount}</div>
        </div>
        <div className="project-stat">
          <div className="divider white-divider" />
          <div className="stat-label">Team members</div>
          <div className="stat-value">{membersCount}</div>
        </div>
        <div className="project-stat">
          <div className="divider white-divider" />
          <div className="stat-label">Days active</div>
          <div className="stat-value">{daysSinceCreated}</div>
        </div>
      </div>
      
      {/* Project Status and Tags */}
      <div className="project-meta">
        <div className="project-status-row">
          <span className={`project-status ${project.status === 'active' ? 'status-active' : 'status-inactive'}`}>
            {project.status || 'active'}
          </span>
          <span className="project-visibility">
            {project.visibility || 'public'}
          </span>
        </div>
        
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="project-tag">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="project-tag-more">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPreview;