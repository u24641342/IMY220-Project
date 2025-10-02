import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import ApiService, { AuthService } from '../services/api';

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const currentUser = AuthService.getUser();
                if (currentUser) {
                    const userResponse = await ApiService.getUserById(currentUser._id);
                    if (userResponse.success) {
                        setUser(userResponse.user);
                    }
                }
            } catch (error) {
                console.error('Error loading user profile:', error);
            }
        };
        
        loadUserProfile();
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };

    return (
        <nav className="vertical-navbar">
            <ul>
                <li>
                    <Link to="/profile"><img src={user?.profilePicture || '/assets/images/pfp.png'} className="iconspot"/>Profile</Link>
                </li>
                <li>
                    <Link to="/home"><img src={'/assets/images/home.png'} className="iconspot"/>Home</Link>
                </li>
                <li>
                    <Link to="/projects"><img src={'/assets/images/project.png'} className="iconspot"/>My Projects</Link>
                </li>
                <li>
                    <button 
                        onClick={handleLogout}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'inherit',
                            font: 'inherit',
                            cursor: 'pointer',
                            padding: '0',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Link to='/'><img src={'/assets/images/bin.png'} className="iconspot"/>Logout</Link>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
