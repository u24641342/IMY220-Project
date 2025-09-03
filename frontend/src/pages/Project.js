import Navbar from '../components/Navbar';
import ProjectFilesBox from '../components/ProjectFilesBox';
import React, { useState } from 'react';
import './Project.css';

function Project() {
    React.useEffect(() => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundColor = "#092327";
            document.body.style.backgroundSize = "cover";
        return () => {
            document.body.style.backgroundColor = '';
        };
        }, []);


	const project = {
		name: 'Project Uno',
		description: 'michael remember to ask about the best way to display the directory => json file? xml?(pls god no). any a description can be very long, so we provide a dropdown to read more. MF DOOM is a very prolific rapper, so remember to spell it with ALL CAPS. Wish I never unboxed those legendaries, my luck is still slowly recovering. I absolutely CANNOT touch that game for a WHILE. 😔',
		files: ['src/', 'public/', 'README.md', 'iforgotmypackage.json', 'everthingworkedtoo.js', 'got2outta27forthatone.prac', '😭'],
		stats: {
			commits: 72,
			branches: 5,
			recentCommits: 41
		},
		collaborators: ['EpicUser#2956', 'diffieDiff#8644', 'michaelsRISEUP#80085'],
		languages: ['JavaBlight', 'SCC', 'LMTH']
	};


	const [showFullDesc, setShowFullDesc] = useState(false);

	return (
        <>
        <Navbar />
		<div className="project-page-container">
			<div className="project-topbar">
				<h1 className="project-title">{project.name}</h1>
				<button className="details-icon" title="More details">&#8942;</button>
			</div>
			<div className="project-main-content">
				<div className="project-left">
					<ProjectFilesBox files={project.files} />
                    <div className="project-files-actions">
                        <button className="project-action-btn">Add Files</button>
                        <button className="project-action-btn">Edit Files</button>
                        <button className="project-action-btn">Edit Permissions</button>
                    </div>
					<div className="project-stats-row">
						<div className="project-stat">
							<div className="divider white-divider" />
							<div className="stat-label">Recent commits</div>
							<div className="stat-value">{project.stats.recentCommits}</div>
						</div>
						<div className="project-stat">
							<div className="divider white-divider" />
							<div className="stat-label">Total branches</div>
							<div className="stat-value">{project.stats.branches}</div>
						</div>
						<div className="project-stat">
							<div className="divider white-divider" />
							<div className="stat-label">Total commits</div>
							<div className="stat-value">{project.stats.commits}</div>
						</div>
					</div>
				</div>
				<div className="project-center">
					<div className="project-desc-box">
						<h2>Description</h2>
						<div className="project-desc-text">
							{showFullDesc ? project.description : project.description.slice(0, 120) + (project.description.length > 120 ? '...' : '')}
						</div>
						{project.description.length > 120 && (
							<button className="desc-dropdown-btn" onClick={() => setShowFullDesc(!showFullDesc)}>
								{showFullDesc ? 'Show less' : 'Read more'}
							</button>
						)}
					</div>
					<div className="project-bottom-row">
						<div className="collaborators-box">
							<h3>Collaborators</h3>
							<ul>
								{project.collaborators.map((col, idx) => (
									<li key={idx}>{col}</li>
								))}
							</ul>
						</div>
						<div className="languages-box">
							<h3>Languages</h3>
							<ul>
								{project.languages.map((lang, idx) => (
									<li key={idx}>{lang}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
        </>
	);
}

export default Project;
