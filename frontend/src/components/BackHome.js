// src/components/BackToHomeButton.js
import React from 'react';
import { Link } from 'react-router-dom';

function BackHome({ className }) {
  return (
    <Link to="/home" className={className}>
      &#8592; Home
    </Link>
  );
}

export default BackHome;