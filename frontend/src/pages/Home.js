import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Feed from '../components/Feed';

function Home() {
    React.useEffect(() => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "#092327";
        document.body.style.backgroundSize = "cover";
    return () => {
        document.body.style.backgroundColor = '#092327';
    };
    }, []);
    return (
        <>
            <Navbar />
            <div className="home-topbar">
                <div className="search-hello">
                    <SearchBar />
                    <span className="hello-msg">Hello, EpicUser#2956!<br />Not <i>too</i> much has happened while you were gone. </span>
                </div>
                <img src={'/assets/images/logo.png'} className="top-logo" />
            </div>
            <div className="divider navbar-divider" />
            <div className="home-container">
                <Feed />
                <div className="divider white-divider" />
                <div className="feed-switch">
                    <button className="switch-btn active">Global</button>
                    <button className="switch-btn">Local</button>
                </div>
            </div>
        </>
    );
}

export default Home;