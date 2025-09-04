import React from 'react';
import { Link } from 'react-router-dom';
import "./Splash.css";

function Splash() {
  React.useEffect(() => {
    document.body.style.backgroundImage = "url('/assets/images/nightsky.jpg')";
    document.body.style.backgroundSize = "cover";
  }, []);
    return (
        <div id="root">
            <img id="logospot" src={'/assets/images/logo.png'} width="50" height="40" alt="Logo" />
            <div>
                <h1 id="wordbox">Control your code.<br />Control your time.</h1>
                <div className="animated-line"></div>
                <h2 id="wordbox" style={{ fontSize: '40px' }}>GitGud provides support for a more<br />casual developer workflow.</h2>
                <h2 id="wordbox" style={{ fontSize: '40px' }}>We also have a deeper understanding of<br />the underlying issues and  challenges<br />you might face whilst doing  version control</h2>
                <h2 id="wordbox" style={{ fontSize: '40px' }}>Allowing us to provide help and support for even the<br />most annoying and convoluted tasks</h2>
                <h2 id="wordbox" style={{ fontSize: '40px' }}>So help yourself, and choose us.</h2>
                <h2 id="wordbox" style={{ fontSize: '40px' }}>Let's get to work.</h2>
            </div>
            <div id="button-container">
                <Link id="signup-button" to="/signup" >Sign Up</Link>
                <Link id="signup-button" to="/home" >Home</Link>
                <Link id="login-button" to="/login" >Login</Link>
            </div>
        </div>
    );
}

export default Splash;