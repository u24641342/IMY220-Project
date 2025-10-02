import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Profile.css';
import BackHome from '../components/BackHome';
import FriendsList from '../components/FriendsList';
import ApiService, { AuthService } from '../services/api';

function Profile() {
    const [activeTab, setActiveTab] = React.useState('notifications');
    const [user, setUser] = React.useState(null);
    const [friends, setFriends] = React.useState([]);
    const [pendingRequests, setPendingRequests] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [editForm, setEditForm] = React.useState({ bio: '', skills: [], profilePicture: '' });
    const [newSkill, setNewSkill] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    
    const currentUser = AuthService.getUser();
    const isOwnProfile = !id || (currentUser && id === currentUser._id);

    React.useEffect(() => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "#092327";
        document.body.style.backgroundSize = "cover";
        
        loadProfileData();
        
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const loadProfileData = async () => {
        try 
        {
            console.log('Loading profile data...', { isOwnProfile, currentUser, id });
            let userData;
            
            if (isOwnProfile) 
            {
                userData = currentUser;
                if (!userData) 
                {
                    console.log('No current user, redirecting to login');
                    navigate('/login');
                    return;
                }
                
                console.log('Loading friends and pending requests for user:', userData._id);

                try 
                {
                    const [friendsResponse, pendingResponse] = await Promise.all([
                        ApiService.getUserFriends(userData._id),
                        ApiService.getPendingFriendRequests(userData._id)
                    ]);
                    
                    console.log('Friends response:', friendsResponse);
                    console.log('Pending requests response:', pendingResponse);
                    
                    if (friendsResponse.success) 
                    {
                        setFriends(friendsResponse.friends);
                    }

                    if (pendingResponse.success) 
                    {
                        setPendingRequests(pendingResponse.pendingRequests);
                        console.log('Set pending requests:', pendingResponse.pendingRequests);
                    }
                } 
                catch (apiError) 
                {
                    console.error('Error loading friends/pending requests:', apiError);
                }
            } 
            else 
            {
                console.log('Loading profile for user ID:', id);
                const userResponse = await ApiService.getUserById(id);
                console.log('User response:', userResponse);
                if (userResponse.success) 
                {
                    userData = userResponse.user;
                } 
                else 
                {
                    console.log('User not found, redirecting to home');
                    navigate('/home');
                    return;
                }
            }
            
            setUser(userData);
            console.log('Profile data loaded successfully:', userData);
        } 
        catch (error) 
        {
            console.error('Error loading profile:', error);
            navigate('/home');
        } 
        finally 
        {
            setLoading(false);
        }
    };

    const handleAcceptFriend = async (friendshipId) => {
        try 
        {
            await ApiService.acceptFriendRequest(friendshipId);
            loadProfileData();
        } 
        catch (error) 
        {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleRejectFriend = async (friendshipId) => {
        try 
        {
            await ApiService.rejectFriendRequest(friendshipId);
            setPendingRequests(pendingRequests.filter(req => req._id !== friendshipId));
        } 
        catch (error) 
        {
            console.error('Error rejecting friend request:', error);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) 
        {
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) 
            {
                alert('File size too large. Please select an image smaller than 5MB.');
                event.target.value = '';
                return;
            }

            if (!file.type.startsWith('image/')) 
            {
                alert('Please select a valid image file.');
                event.target.value = '';
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setEditForm(prev => ({
                    ...prev,
                    profilePicture: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) 
        {
            setEditForm(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setEditForm(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleSaveProfile = async () => {
        try 
        {
            const updateData = {
                bio: editForm.bio,
                skills: editForm.skills,
                profilePicture: editForm.profilePicture
            };

            await ApiService.updateUser(currentUser._id, updateData);
            
            const updatedUser = { ...user, ...updateData };
            setUser(updatedUser);
            AuthService.setUser(updatedUser);
            
            setShowEditModal(false);
            alert('Profile updated successfully!');
        } 
        catch (error) 
        {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (loading) 
    {
        return <div>Loading profile...</div>;
    }

    if (!user)
    {
        return <div>User not found</div>;
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
                        <img src={user.profilePicture || "/assets/images/pfp.png"} className="profile-pic" />
                        {isOwnProfile && (
                            <span 
                                className="edit-icon" 
                                title="Edit profile"
                                onClick={() => {
                                    setEditForm({
                                        bio: user.bio || '',
                                        skills: user.skills || [],
                                        profilePicture: user.profilePicture || ''
                                    });
                                    setShowEditModal(true);
                                }}
                            >
                                &#9998;
                            </span>
                        )}
                    </div>
                    <div className="profile-username">{user.name}</div>
                    {user.bio && (
                        <div className="profile-bio">
                            {user.bio}
                        </div>
                    )}
                    {user.skills && user.skills.length > 0 && (
                        <div className="profile-skills">
                            Skills: {user.skills.join(', ')}
                        </div>
                    )}
                    <div className="divider white-divider" />
                    <div className="profile-tabs-window">
                        <div className="profile-tabs">
                            {isOwnProfile && (
                                <button className={`tab-btn${activeTab === 'notifications' ? ' active' : ''}`} onClick={() => setActiveTab('notifications')}>
                                    Notifications {pendingRequests.length > 0 && `(${pendingRequests.length})`}
                                </button>
                            )}
                            <button className={`tab-btn${activeTab === 'friends' ? ' active' : ''}`} onClick={() => setActiveTab('friends')}>Friends</button>
                            <Link to="/projects" className="tab-btn">Projects</Link>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'notifications' && isOwnProfile && (
                                <div className="profile-notifications">
                                    <h4 className="notification-title">Notifications</h4>
                                    
                                    {pendingRequests.length > 0 && (
                                        <div className="friend-requests-section">
                                            <h5 className="notification-section-title">Friend Requests ({pendingRequests.length})</h5>
                                            {pendingRequests.map((request) => (
                                                <div key={request._id} className="friend-request-card">
                                                    <div className="friend-request-info">
                                                        <img 
                                                            src={request.requesterDetails?.profilePicture || '/assets/images/pfp.png'} 
                                                            className="friend-request-avatar"
                                                            alt="Profile"
                                                        />
                                                        <div>
                                                            <div className="friend-request-name">
                                                                {request.requesterDetails?.name || 'Unknown User'}
                                                            </div>
                                                            <div className="friend-request-date">
                                                                Sent {new Date(request.createdAt).toLocaleDateString()}
                                                            </div>
                                                            {request.requesterDetails?.bio && (
                                                                <div className="friend-request-bio">
                                                                    {request.requesterDetails.bio.length > 50 
                                                                        ? request.requesterDetails.bio.substring(0, 50) + '...' 
                                                                        : request.requesterDetails.bio}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="friend-request-actions">
                                                        <button 
                                                            onClick={() => handleAcceptFriend(request._id)}
                                                            className="btn-accept"
                                                        >
                                                            ✓ Accept
                                                        </button>
                                                        <button 
                                                            onClick={() => handleRejectFriend(request._id)}
                                                            className="btn-reject"
                                                        >
                                                            ✗ Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <div>
                                        <h5 className="activity-section-title">Recent Activity</h5>
                                        {friends.length > 0 ? (
                                            <div className="activity-card">
                                                You have {friends.length} friend{friends.length !== 1 ? 's' : ''} on GitGud
                                            </div>
                                        ) : (
                                            <div className="activity-card">
                                                Connect with other developers by sending friend requests!
                                            </div>
                                        )}
                                    </div>
                                    
                                    {pendingRequests.length === 0 && friends.length === 0 && (
                                        <div className="no-notifications-full">
                                            <div>📬 No new notifications</div>
                                            <div className="no-notifications-subtitle">
                                                Start connecting with other developers!
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'friends' && (
                                <FriendsList 
                                    friends={friends} 
                                    isOwnProfile={isOwnProfile}
                                    currentUserId={currentUser?._id}
                                    profileUserId={user._id}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="modal-title">Edit Profile</h3>
                        
                        <div className="modal-form-group">
                            <label className="modal-label">Profile Picture (max 5MB)</label>
                            {editForm.profilePicture && (
                                <img 
                                    src={editForm.profilePicture} 
                                    className="profile-picture-preview"
                                    alt="Profile preview"
                                />
                            )}
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="modal-file-input"
                            />
                            <small className="modal-help-text">
                                Supported formats: JPG, PNG, GIF. Maximum size: 5MB
                            </small>
                        </div>
                        
                        <div className="modal-form-group">
                            <label className="modal-label">Bio</label>
                            <textarea 
                                value={editForm.bio}
                                onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                placeholder="Tell us about yourself..."
                                className="modal-textarea"
                            />
                        </div>
                        
                        <div className="modal-form-group">
                            <label className="modal-label">Skills</label>
                            <div className="skills-input-container">
                                <input 
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add a skill"
                                    className="modal-input"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                />
                                <button 
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="btn-save btn-small"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="skills-display">
                                {editForm.skills.map((skill, index) => (
                                    <div key={index} className="skill-tag">
                                        {skill}
                                        <button 
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="skill-remove-btn"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <button 
                                onClick={() => {
                                    setShowEditModal(false);
                                    setSelectedFile(null);
                                    setNewSkill('');
                                }}
                                className="btn-cancel"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveProfile}
                                className="btn-save"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;