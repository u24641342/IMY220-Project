import Navbar from '../components/Navbar';
import ProjectFilesBox from '../components/ProjectFilesBox';
import CommentsBox from '../components/CommentsBox';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CheckinComments from '../components/CheckinComments';
import ApiService, { AuthService } from '../services/api';
import './Project.css';

function Project() {
    const [project, setProject] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [projectMembers, setProjectMembers] = React.useState([]);
    const [projectOwner, setProjectOwner] = React.useState(null);
    const [newCheckIn, setNewCheckIn] = React.useState('');
    const [showAddMember, setShowAddMember] = React.useState(false);
    const [newMemberEmail, setNewMemberEmail] = React.useState('');
    const [showFileUpload, setShowFileUpload] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [editingFile, setEditingFile] = React.useState(null);
    const [fileContent, setFileContent] = React.useState('');
    const [fileUploadCheckInMessage, setFileUploadCheckInMessage] = React.useState('');
    const [fileEditCheckInMessage, setFileEditCheckInMessage] = React.useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = AuthService.getUser();

    React.useEffect(() => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "#092327";
        document.body.style.backgroundSize = "cover";
        
        if (id)
        {
            loadProject();
        }
        else
        {
            setError('No project ID provided');
            setLoading(false);
        }
        
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const loadProject = async () => {
        try 
        {
            const response = await ApiService.getProjectById(id);
            if (response.success)
            {
                const projectData = response.project;
                setProject(projectData);
                
                if (projectData.ownerId)
                {
                    const ownerResponse = await ApiService.getUserById(projectData.ownerId);
                    if (ownerResponse.success)
                    {
                        setProjectOwner(ownerResponse.user);
                    }
                }
                
                if (projectData.members && projectData.members.length > 0)
                {
                    const memberPromises = projectData.members.map(memberId => 
                        ApiService.getUserById(memberId)
                    );
                    const memberResponses = await Promise.all(memberPromises);
                    const members = memberResponses
                        .filter(response => response.success)
                        .map(response => response.user);
                    setProjectMembers(members);
                }
            }
            else
            {
                setError('Project not found');
            }
        } 
        catch (error) 
        {
            console.error('Error loading project:', error);
            setError('Failed to load project');
        } 
        finally 
        {
            setLoading(false);
        }
    };

    const handleAddCheckIn = async () => {
        if (!newCheckIn.trim() || !currentUser)
            return;
        
        try 
        {
            const checkInData = {
                userId: currentUser._id,
                message: newCheckIn
            };
            
            await ApiService.addCheckIn(id, checkInData);
            setNewCheckIn('');
            loadProject();
        } 
        catch (error) 
        {
            console.error('Error adding check-in:', error);
            alert('Failed to add check-in');
        }
    };

    const isProjectMember = () => {
        if (!currentUser || !project)
            return false;
        return project.ownerId === currentUser._id || 
               (project.members && project.members.includes(currentUser._id));
    };

    const isProjectOwner = () => {
        if (!currentUser || !project)
            return false;
        return project.ownerId === currentUser._id;
    };

    const handleAddMember = async () => {
        if (!newMemberEmail.trim())
            return;
        
        try 
        {
            const userResponse = await ApiService.searchUsers(newMemberEmail);
            if (!userResponse.success || userResponse.users.length === 0) 
            {
                alert('User not found with that email');
                return;
            }
            
            const user = userResponse.users.find(u => u.email === newMemberEmail);
            if (!user) 
            {
                alert('User not found with that email');
                return;
            }
            
            if (project.members && project.members.includes(user._id)) 
            {
                alert('User is already a member of this project');
                return;
            }
            
            await ApiService.addMemberToProject(id, user._id);
            setNewMemberEmail('');
            setShowAddMember(false);
            loadProject();
        } 
        catch (error) 
        {
            console.error('Error adding member:', error);
            alert('Failed to add member');
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (!confirm('Are you sure you want to remove this member?')) return;
        
        try 
        {
            await ApiService.removeMemberFromProject(id, memberId);
            loadProject();
        } 
        catch (error) 
        {
            console.error('Error removing member:', error);
            alert('Failed to remove member');
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) 
        {
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) 
            {
                alert('File size too large. Please select a file smaller than 10MB.');
                event.target.value = '';
                return;
            }

            setSelectedFile(file);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile || !currentUser) return;
        
        if (!fileUploadCheckInMessage.trim()) 
        {
            alert('Please provide a check-in message describing the file you\'re adding.');
            return;
        }
        
        try 
        {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = btoa(e.target.result);
                
                const fileData = {
                    name: selectedFile.name,
                    originalName: selectedFile.name,
                    size: selectedFile.size,
                    type: selectedFile.type,
                    uploadedBy: currentUser._id,
                    content: content
                };
                
                await ApiService.addFileToProject(id, fileData);
                
                const checkInData = {
                    userId: currentUser._id,
                    message: `📎 Added file "${selectedFile.name}": ${fileUploadCheckInMessage.trim()}`
                };
                await ApiService.addCheckIn(id, checkInData);
                
                setSelectedFile(null);
                setFileUploadCheckInMessage('');
                setShowFileUpload(false);
                loadProject();
            };
            reader.readAsBinaryString(selectedFile);
        } 
        catch (error) 
        {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    };

    const handleDownloadFile = async (file) => {
        try 
        {
            if (file.content) 
            {
                const binaryString = atob(file.content);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) 
                {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const blob = new Blob([bytes], { type: file.type });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = file.originalName || file.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } 
        catch (error) 
        {
            console.error('Error downloading file:', error);
            alert('Failed to download file');
        }
    };

    const handleDeleteFile = async (fileId) => {
        if (!confirm('Are you sure you want to delete this file?')) return;
        
        try 
        {
            await ApiService.removeFileFromProject(id, fileId);
            loadProject();
        } 
        catch (error) 
        {
            console.error('Error deleting file:', error);
            alert('Failed to delete file');
        }
    };

    const handleEditFile = async (file) => {
        try 
        {
            if (file.content) 
            {
                const content = atob(file.content);
                setFileContent(content);
                setEditingFile(file);
                setFileEditCheckInMessage('');
            }
        } 
        catch (error) 
        {
            console.error('Error loading file for editing:', error);
            alert('Failed to load file for editing');
        }
    };

    const handleSaveFileEdit = async () => {
        if (!editingFile || !currentUser) return;
        
        if (!fileEditCheckInMessage.trim()) 
        {
            alert('Please provide a check-in message describing your changes.');
            return;
        }
        
        try 
        {
            const content = btoa(fileContent);
            
            await ApiService.updateFileInProject(id, editingFile._id, {
                content: content,
                name: editingFile.name
            });
            
            const checkInData = {
                userId: currentUser._id,
                message: `✏️ Updated file "${editingFile.name}": ${fileEditCheckInMessage.trim()}`
            };
            await ApiService.addCheckIn(id, checkInData);
            
            setEditingFile(null);
            setFileContent('');
            setFileEditCheckInMessage('');
            loadProject();
        } 
        catch (error) 
        {
            console.error('Error saving file:', error);
            alert('Failed to save file');
        }
    };

    if (loading) 
    {
        return (
            <>
                <Navbar />
                <div className="project-page-container">
                    <div className="project-loading-container">
                        Loading project...
                    </div>
                </div>
            </>
        );
    }

    if (error || !project) 
    {
        return (
            <>
                <Navbar />
                <div className="project-page-container">
                    <div className="project-error-container">
                        <h2>{error || 'Project not found'}</h2>
                        <button 
                            onClick={() => navigate('/projects')}
                            className="project-back-button"
                        >
                            Back to Projects
                        </button>
                    </div>
                </div>
            </>
        );
    }

	return (
        <>
        <Navbar />
		<div className="project-page-container">
			<div className="project-topbar">
				<h1 className="project-title">{project.name}</h1>
				<div className="project-status-container">
					<div className="project-status-text">
						Status: <span className={`project-status-value ${project.status === 'active' ? 'status-active' : 'status-inactive'}`}>
							{project.status || 'active'}
						</span>
					</div>
					<button className="details-icon" title="More details">&#8942;</button>
				</div>
			</div>
			<div className="project-main-content">
				<div className="project-left">
					{/* File Management Section */}
                    <div className="file-management-section">
                        <div className="file-section-header">
                            <h3 className="file-section-title">Project Files</h3>
                            {isProjectMember() && (
                                <button 
                                    onClick={() => setShowFileUpload(true)}
                                    className="btn-primary"
                                >
                                    Add File
                                </button>
                            )}
                        </div>
                        
                        <div className="file-list-container">
                            {project.files && project.files.length > 0 ? (
                                project.files.map((file) => (
                                    <div key={file._id} className="file-item">
                                        <div className="file-info">
                                            <div className="file-name">{file.name}</div>
                                            <div className="file-meta">
                                                {(file.size / 1024).toFixed(1)} KB • {new Date(file.uploadedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="file-actions">
                                            <button 
                                                onClick={() => handleDownloadFile(file)}
                                                className="btn-secondary"
                                            >
                                                Download
                                            </button>
                                            {isProjectMember() && (
                                                <>
                                                    <button 
                                                        onClick={() => handleEditFile(file)}
                                                        className="btn-warning"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteFile(file._id)}
                                                        className="btn-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-files">
                                    No files uploaded yet
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Check-ins Section */}
                    <div className="checkin-section">
                        <h3 className="checkin-section-title">Check-ins</h3>
                        
                        {/* Add new check-in (only for members) */}
                        {isProjectMember() && (
                            <div className="checkin-form">
                                <h4 className="checkin-form-title">Add Check-in</h4>
                                <textarea
                                    value={newCheckIn}
                                    onChange={(e) => setNewCheckIn(e.target.value)}
                                    placeholder="What did you work on?"
                                    className="checkin-textarea"
                                />
                                <button
                                    onClick={handleAddCheckIn}
                                    disabled={!newCheckIn.trim()}
                                    className={`btn-primary ${newCheckIn.trim() ? 'checkin-btn-active' : 'checkin-btn-disabled'}`}
                                >
                                    Add Check-in
                                </button>
                            </div>
                        )}
                        
                        {/* Display existing check-ins */}
                        {project.checkIns && project.checkIns.length > 0 ? (
                            <div className="checkins-scroll-container">
                                {project.checkIns.slice().reverse().map((checkIn, index) => (
                                    <div key={checkIn._id || index} className="checkin-item">
                                        <div className="checkin-header">
                                            <div className="checkin-number">
                                                Check-in #{project.checkIns.length - index}
                                            </div>
                                            <div className="checkin-date">
                                                {new Date(checkIn.timestamp).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="checkin-message">
                                            {checkIn.message}
                                        </div>
                                        
                                        {/* Check-in Comments */}
                                        {checkIn.comments && checkIn.comments.length > 0 && (
                                            <div className="checkin-comments">
                                                {checkIn.comments.map((comment, commentIndex) => (
                                                    <div key={comment._id || commentIndex} className="checkin-comment">
                                                        <div className="comment-timestamp">
                                                            {new Date(comment.timestamp).toLocaleString()}
                                                        </div>
                                                        <div className="comment-message">
                                                            {comment.message}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-checkins">
                                No check-ins yet. {isProjectMember() ? 'Be the first to add one!' : ''}
                            </div>
                        )}
                    </div>

					<div className="project-stats-row">
						<div className="project-stat">
							<div className="divider white-divider" />
							<div className="stat-label">Check-ins</div>
							<div className="stat-value">{project.checkIns ? project.checkIns.length : 0}</div>
						</div>
						<div className="project-stat">
							<div className="divider white-divider" />
							<div className="stat-label">Members</div>
							<div className="stat-value">{(project.members ? project.members.length : 0) + 1}</div>
						</div>
						<div className="project-stat">
							<div className="divider white-divider" />
							<div className="stat-label">Created</div>
							<div className="stat-value">{new Date(project.createdAt).toLocaleDateString()}</div>
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
							<div className="team-member-header">
								<h3>Team Members</h3>
								{isProjectOwner() && (
									<button 
										onClick={() => setShowAddMember(true)}
										className="btn-primary"
									>
										Add Member
									</button>
								)}
							</div>
							<ul>
								{/* Project Owner */}
								{projectOwner && (
									<li className="team-member-item">
										<span className="member-name owner-member">{projectOwner.name} (Owner)</span>
									</li>
								)}
								{/* Project Members */}
								{projectMembers.map((member) => (
									<li key={member._id} className="team-member-item">
										<span className="member-name">{member.name}</span>
										{isProjectOwner() && (
											<button 
												onClick={() => handleRemoveMember(member._id)}
												className="btn-danger-sm"
											>
												Remove
											</button>
										)}
									</li>
								))}
								{projectMembers.length === 0 && !projectOwner && (
									<li className="project-members-empty">No team members</li>
								)}
							</ul>
						</div>
						<div className="languages-box">
							<h3>Tags</h3>
							<ul>
								{project.tags && project.tags.length > 0 ? (
									project.tags.map((tag, idx) => (
										<li key={idx}>{tag}</li>
									))
								) : (
									<li className="project-tags-empty">No tags</li>
								)}
							</ul>
						</div>
						<div className="project-info-box">
							<h3>Project Info</h3>
							<div className="project-info-text">
								<div>Visibility: <span className="project-info-value">{project.visibility || 'public'}</span></div>
								<div>Status: <span className={`project-info-status ${project.status === 'active' ? 'status-active' : 'status-inactive'}`}>
									{project.status || 'active'}
								</span></div>
								<div>Created: <span className="project-info-value">
									{new Date(project.createdAt).toLocaleDateString()}
								</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        
        {/* Add Member Modal */}
        {showAddMember && (
            <div className="add-member-modal-overlay">
                <div className="add-member-modal-content">
                    <h3 className="add-member-modal-title">Add Team Member</h3>
                    <input
                        type="email"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        placeholder="Enter member's email"
                        className="add-member-modal-input"
                    />
                    <div className="add-member-modal-actions">
                        <button
                            onClick={() => {
                                setShowAddMember(false);
                                setNewMemberEmail('');
                            }}
                            className="add-member-btn-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddMember}
                            disabled={!newMemberEmail.trim()}
                            className="add-member-btn-add"
                        >
                            Add Member
                        </button>
                    </div>
                </div>
            </div>
        )}
        
        {/* File Upload Modal */}
        {showFileUpload && (
            <div className="project-modal-overlay">
                <div className="project-modal-content">
                    <h3 className="project-modal-title">Upload File (max 10MB)</h3>
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        className="project-modal-input"
                    />
                    <small className="file-upload-modal-size-info">
                        Maximum file size: 10MB. All file types supported.
                    </small>
                    {selectedFile && (
                        <div className="project-modal-file-info">
                            Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                        </div>
                    )}
                    <div className="project-modal-form-group">
                        <label className="project-modal-label">Check-in Message (Required)</label>
                        <textarea
                            value={fileUploadCheckInMessage}
                            onChange={(e) => setFileUploadCheckInMessage(e.target.value)}
                            placeholder="Describe the file you're adding and why..."
                            className="project-modal-textarea"
                            rows="3"
                            required
                        />
                        <small className="file-upload-modal-help-text">
                            This message will be added as a check-in to track your file upload.
                        </small>
                    </div>
                    <div className="project-modal-actions">
                        <button
                            onClick={() => {
                                setShowFileUpload(false);
                                setSelectedFile(null);
                                setFileUploadCheckInMessage('');
                            }}
                            className="project-modal-btn-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFileUpload}
                            disabled={!selectedFile || !fileUploadCheckInMessage.trim()}
                            className="project-modal-btn-save"
                        >
                            Upload & Check-in
                        </button>
                    </div>
                </div>
            </div>
        )}
        
        {/* File Edit Modal */}
        {editingFile && (
            <div className="project-modal-overlay">
                <div className="project-modal-content file-edit-modal-content">
                    <h3 className="project-modal-title">Edit File: {editingFile.name}</h3>
                    <div className="project-modal-form-group">
                        <label className="project-modal-label">File Content</label>
                        <textarea
                            value={fileContent}
                            onChange={(e) => setFileContent(e.target.value)}
                            className="project-modal-textarea"
                            rows="15"
                        />
                    </div>
                    <div className="project-modal-form-group">
                        <label className="project-modal-label">Check-in Message (Required)</label>
                        <textarea
                            value={fileEditCheckInMessage}
                            onChange={(e) => setFileEditCheckInMessage(e.target.value)}
                            placeholder="Describe the changes you made to this file..."
                            className="project-modal-textarea"
                            rows="3"
                            required
                        />
                        <small className="file-edit-modal-help-text">
                            This message will be added as a check-in to track your file changes.
                        </small>
                    </div>
                    <div className="project-modal-actions">
                        <button
                            onClick={() => {
                                setEditingFile(null);
                                setFileContent('');
                                setFileEditCheckInMessage('');
                            }}
                            className="project-modal-btn-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveFileEdit}
                            disabled={!fileEditCheckInMessage.trim()}
                            className="project-modal-btn-save"
                        >
                            Save & Check-in
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
	);


}
export default Project;
