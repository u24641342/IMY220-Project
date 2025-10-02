import './Profile.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackHome from '../components/BackHome';
import ProjectPreview from '../components/ProjectPreview';
import ApiService, { AuthService } from '../services/api';

function Projects() {
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showCreateForm, setShowCreateForm] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [projectToDelete, setProjectToDelete] = React.useState(null);
    const [deleteConfirmName, setDeleteConfirmName] = React.useState('');
    const [newProject, setNewProject] = React.useState({
        name: '',
        description: '',
        tags: '',
        visibility: 'public'
    });
    const navigate = useNavigate();

    React.useEffect(() => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "#092327";
        document.body.style.backgroundSize = "cover";
        
        loadUserProjects();
        
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const loadUserProjects = async () => {
        try 
        {
            const currentUser = AuthService.getUser();
            
            if (!currentUser)
            {
                navigate('/login');
                return;
            }

            const userResponse = await ApiService.getUserById(currentUser._id);
            if (userResponse.success)
            {
                setUser(userResponse.user);
            }

            const response = await ApiService.getProjectsByUser(currentUser._id);
            
            if (response.success)
            {
                setProjects(response.projects);
            }
        } 
        catch (error) 
        {
            console.error('Error loading projects:', error);
        } 
        finally 
        {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try 
        {
            const user = AuthService.getUser();
            if (!user)
                return;

            const projectData = {
                ...newProject,
                ownerId: user._id,
                tags: newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            };

            const response = await ApiService.createProject(projectData);
            if (response.success)
            {
                setProjects([...projects, response.project]);
                setNewProject({ name: '', description: '', tags: '', visibility: 'public' });
                setShowCreateForm(false);
                alert('Project created successfully!');
            }
        } 
        catch (error) 
        {
            alert(`Error creating project: ${error.message}`);
        }
    };

    const handleDeleteProject = (project) => {
        setProjectToDelete(project);
        setDeleteConfirmName('');
        setShowDeleteModal(true);
    };

    const confirmDeleteProject = async () => {
        if (!projectToDelete || deleteConfirmName !== projectToDelete.name)
        {
            alert('Project name does not match. Please type the exact project name to confirm deletion.');
            return;
        }

        try 
        {
            const response = await ApiService.deleteProject(projectToDelete._id);
            if (response.success)
            {
                setProjects(projects.filter(p => p._id !== projectToDelete._id));
                setShowDeleteModal(false);
                setProjectToDelete(null);
                setDeleteConfirmName('');
                alert('Project deleted successfully!');
            }
        } 
        catch (error) 
        {
            alert(`Error deleting project: ${error.message}`);
        }
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setProjectToDelete(null);
        setDeleteConfirmName('');
    };

    if (loading)
    {
        return (
            <div className="projects-loading">
                Loading projects...
            </div>
        );
    }
    return (
        <>
            <div className="profile-topbar">
                <BackHome className="back-btn" />
                <img src="/assets/images/logo.png" className="profile-logo" />
            </div>
            <div className="profile-container">
                <div className="profile-center">
                    <div className="profile-pic-wrapper">
                        <img src={user?.profilePicture || "/assets/images/pfp.png"} className="profile-pic" />
                        <span className="edit-icon" title="Edit profile picture">&#9998;</span>
                    </div>
                    <div className="profile-username">{user?.name || 'User'}</div>
                    <div className="divider white-divider" />
                    <div className="profile-tabs-window">
                        <div className="profile-tabs">
                            <Link to="/profile" className="tab-btn">Notifications</Link>
                            <button className="tab-btn active">Projects</button>
                        </div>
                        <div className="tab-content">
                            <div className="projects-create-section">
                                <button 
                                    onClick={() => setShowCreateForm(!showCreateForm)}
                                    className="projects-create-button"
                                >
                                    {showCreateForm ? 'Cancel' : 'Create New Project'}
                                </button>
                            </div>
                            
                            {showCreateForm && (
                                <form onSubmit={handleCreateProject} className="projects-create-form">
                                    <h3 className="projects-create-title">Create New Project</h3>
                                    <div className="projects-form-group">
                                        <input
                                            type="text"
                                            placeholder="Project Name"
                                            value={newProject.name}
                                            onChange={e => setNewProject({...newProject, name: e.target.value})}
                                            required
                                            className="projects-form-input"
                                        />
                                        <textarea
                                            placeholder="Project Description"
                                            value={newProject.description}
                                            onChange={e => setNewProject({...newProject, description: e.target.value})}
                                            required
                                            rows={3}
                                            className="projects-form-textarea"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Tags (comma-separated)"
                                            value={newProject.tags}
                                            onChange={e => setNewProject({...newProject, tags: e.target.value})}
                                            className="projects-form-input"
                                        />
                                        <select
                                            value={newProject.visibility}
                                            onChange={e => setNewProject({...newProject, visibility: e.target.value})}
                                            className="projects-form-select"
                                        >
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="projects-submit-button">
                                        Create Project
                                    </button>
                                </form>
                            )}
                            
                            <div className="projects-grid">
                                {projects.length > 0 ? (
                                    projects.map((project) => (
                                        <ProjectPreview 
                                            key={project._id} 
                                            project={project}
                                            onDelete={handleDeleteProject}
                                        />
                                    ))
                                ) : (
                                    <div className="projects-empty-state">
                                        No projects yet. Create your first project to get started!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {showDeleteModal && projectToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="modal-title">Delete Project</h3>
                        <div className="modal-form-group">
                            <p className="delete-warning">
                                ⚠️ This action cannot be undone. This will permanently delete the project 
                                <strong>"{projectToDelete.name}"</strong> and all of its data.
                            </p>
                            <label className="modal-label">
                                Please type <strong>{projectToDelete.name}</strong> to confirm:
                            </label>
                            <input
                                type="text"
                                value={deleteConfirmName}
                                onChange={(e) => setDeleteConfirmName(e.target.value)}
                                placeholder={`Type "${projectToDelete.name}" here`}
                                className="modal-input"
                                autoFocus
                            />
                        </div>
                        <div className="modal-actions">
                            <button
                                onClick={closeDeleteModal}
                                className="btn-cancel"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteProject}
                                disabled={deleteConfirmName !== projectToDelete.name}
                                className="btn-delete"
                            >
                                Delete Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Projects;