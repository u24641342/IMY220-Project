import React from 'react';
import '../pages/Home.css';

function SearchBar({ className, placeholder }) {
  return (
    <input
      className={className || 'search-bar'}
      type="text"
      placeholder={placeholder || 'Search...'}
    />
  );
}

export default SearchBar;
