import React from 'react';
import '../pages/Project.css';

function ProjectFilesBox({ files }) {
    return (
        <div className="project-files-box">
            <h2>Files & Folders</h2>
            <ul className="project-files-list">
                {files.map((file, idx) => (
                    <li key={idx}>{file}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectFilesBox;
