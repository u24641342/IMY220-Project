import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="vertical-navbar">
            <ul>
                <li>
                    <Link to="/profile"><img src={'/assets/images/pfp.png'} className="iconspot"/>Profile</Link>
                </li>
                <li>
                    <Link to="/home"><img src={'/assets/images/home.png'} className="iconspot"/>Home</Link>
                </li>
                <li>
                    <Link to="/projects"><img src={'/assets/images/project.png'} className="iconspot"/>My Projects</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
