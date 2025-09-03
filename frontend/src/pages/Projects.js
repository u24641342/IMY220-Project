import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import BackHome from '../components/BackHome';
import ProjectPreview from '../components/ProjectPreview';

function Projects() {
    React.useEffect(() => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "#092327";
        document.body.style.backgroundSize = "cover";
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);
    const projects = [
        {
            name: "Project Uno",
            image: "/assets/images/project.png",
            changes: 5,
            checkouts: 2,
            commits: 12
        },
        {
            name: "Project Dos",
            image: "/assets/images/project.png",
            changes: 5,
            checkouts: 2,
            commits: 12
        },
        {
            name: "Project Tres",
            image: "/assets/images/project.png",
            changes: 5,
            checkouts: 2,
            commits: 12
        },
        {
            name: "Project Quattro",
            image: "/assets/images/project.png",
            changes: 5,
            checkouts: 2,
            commits: 12
        },
        {
            name: "Project Cinque",
            image: "/assets/images/project.png",
            changes: 5,
            checkouts: 2,
            commits: 12
        },
    ];

    return (
        <>
            <div className="profile-topbar">
                <BackHome className="back-btn" />
                <img src="/assets/images/logo.png" className="profile-logo" />
            </div>
            <div className="profile-container">
                <div className="profile-center">
                    <div className="profile-pic-wrapper">
                        <img src="/assets/images/pfp.png" className="profile-pic" />
                        <span className="edit-icon" title="Edit profile picture">&#9998;</span>
                    </div>
                    <div className="profile-username">EpicUser#2956</div>
                    <div className="divider white-divider" />
                    <div className="profile-tabs-window">
                        <div className="profile-tabs">
                            <Link to="/profile" className="tab-btn">Notifications</Link>
                            <button className="tab-btn active">Projects</button>
                        </div>
                        <div className="tab-content">
                            <div className="projects-grid">
                                {projects.map((project, idx) => (
                                    <ProjectPreview key={idx} project={project} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Projects;