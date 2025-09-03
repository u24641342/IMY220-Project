import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Project from './pages/Project';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/project/:id" element={<Project />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;