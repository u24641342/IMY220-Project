import './Home.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Feed from '../components/Feed';
import { AuthService } from '../services/api';

function Home() {
    const [user, setUser] = React.useState(null);
    const [feedMode, setFeedMode] = React.useState('global');
    const navigate = useNavigate();

    React.useEffect(() => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "#092327";
        document.body.style.backgroundSize = "cover";
        
        const currentUser = AuthService.getUser();
        if (!currentUser)
        {
            navigate('/login');
            return;
        }
        
        setUser(currentUser);
        
        return () => {
            document.body.style.backgroundColor = '#092327';
        };
    }, [navigate]);

    const handleFeedSwitch = (mode) => {
        setFeedMode(mode);
    };

    if (!user)
    {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="home-topbar">
                <div className="search-hello">
                    <SearchBar />
                    <span className="hello-msg">
                        Hello, {user.name}!<br />
                        Welcome back to GitGud. Ready to collaborate?
                    </span>
                </div>
                <img src={'/assets/images/logo.png'} className="top-logo" />
            </div>
            <div className="divider navbar-divider" />
            <div className="home-container">
                <Feed feedMode={feedMode} />
                <div className="divider white-divider" />
                <div className="feed-switch">
                    <button 
                        className={`switch-btn ${feedMode === 'global' ? 'active' : ''}`}
                        onClick={() => handleFeedSwitch('global')}
                    >
                        Global
                    </button>
                    <button 
                        className={`switch-btn ${feedMode === 'local' ? 'active' : ''}`}
                        onClick={() => handleFeedSwitch('local')}
                    >
                        Local
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;