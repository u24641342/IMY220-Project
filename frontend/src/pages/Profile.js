import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import BackHome from '../components/BackHome';

function Profile() {
    React.useEffect(() => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "#092327";
        document.body.style.backgroundSize = "cover";
    return () => {
        document.body.style.backgroundColor = '';
    };
    }, []);
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
                            <button className="tab-btn active">Notifications</button>
                            <Link to="/projects" className="tab-btn">Projects</Link>
                        </div>
                        <div className="tab-content">
                            <ul className="profile-notifications">
                                <li><img src={'/assets/images/pfp.png'} style={{ width: '30px' }}/>Non-Epicuser#1432 has commented on your post: "Why did you make it public? We are so cooked 😭"</li>
                                <li><img src={'/assets/images/project.png'} style={{ width: '30px' }}/> "Project Uno" was updated.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;