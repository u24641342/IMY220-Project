import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Home.css';
import ApiService from '../services/api';

function SearchBar({ className, placeholder, onSearchResults }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState({ users: [], projects: [] });
  const [showResults, setShowResults] = React.useState(false);

  const handleSearch = async (term) => {
    if (!term.trim())
    {
      setSearchResults({ users: [], projects: [] });
      setShowResults(false);
      if (onSearchResults) onSearchResults({ users: [], projects: [] });
      return;
    }

    setIsSearching(true);
    try 
    {
      const [usersResponse, projectsResponse] = await Promise.all([
        ApiService.searchUsers(term),
        ApiService.searchProjects(term)
      ]);

      const results = {
        users: usersResponse.success ? usersResponse.users : [],
        projects: projectsResponse.success ? projectsResponse.projects : []
      };

      setSearchResults(results);
      setShowResults(true);

      if (onSearchResults) 
      {
        onSearchResults(results);
      }
    } 
    catch (error) 
    {
      console.error('Search error:', error);
      setSearchResults({ users: [], projects: [] });
      if (onSearchResults) onSearchResults({ users: [], projects: [] });
    } 
    finally 
    {
      setIsSearching(false);
    }
  };

  // Debounced search
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') 
    {
      handleSearch(searchTerm);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        className={className || 'search-bar'}
        type="text"
        placeholder={placeholder || 'Search users and projects...'}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => searchTerm && setShowResults(true)}
      />
      {isSearching && (
        <div style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '12px',
          color: '#666'
        }}>
          Searching...
        </div>
      )}
      
      {showResults && (searchResults.users.length > 0 || searchResults.projects.length > 0) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          backgroundColor: '#1a3a3e',
          border: '1px solid #2a4a4e',
          borderRadius: '5px',
          maxHeight: '300px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          {searchResults.users.length > 0 && (
            <div>
              <div style={{ 
                padding: '10px', 
                backgroundColor: '#0a2a2e', 
                color: '#fff', 
                fontWeight: 'bold',
                borderBottom: '1px solid #2a4a4e'
              }}>
                Users
              </div>
              {searchResults.users.map(user => (
                <Link
                  key={user._id}
                  to={`/profile/${user._id}`}
                  onClick={handleResultClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    textDecoration: 'none',
                    color: '#fff',
                    borderBottom: '1px solid #2a4a4e'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2a4a4e'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <img 
                    src={user.profilePicture || '/assets/images/pfp.png'} 
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                    {user.bio && (
                      <div style={{ fontSize: '12px', color: '#aaa' }}>
                        {user.bio.length > 40 ? user.bio.substring(0, 40) + '...' : user.bio}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {searchResults.projects.length > 0 && (
            <div>
              <div style={{ 
                padding: '10px', 
                backgroundColor: '#0a2a2e', 
                color: '#fff', 
                fontWeight: 'bold',
                borderBottom: '1px solid #2a4a4e'
              }}>
                Projects
              </div>
              {searchResults.projects.map(project => (
                <Link
                  key={project._id}
                  to={`/project/${project._id}`}
                  onClick={handleResultClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    textDecoration: 'none',
                    color: '#fff',
                    borderBottom: '1px solid #2a4a4e'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2a4a4e'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <img 
                    src={'/assets/images/project.png'} 
                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{project.name}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>
                      {project.description.length > 40 ? project.description.substring(0, 40) + '...' : project.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
      
      {showResults && searchTerm && searchResults.users.length === 0 && searchResults.projects.length === 0 && !isSearching && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          backgroundColor: '#1a3a3e',
          border: '1px solid #2a4a4e',
          borderRadius: '5px',
          padding: '20px',
          textAlign: 'center',
          color: '#aaa',
          zIndex: 1000
        }}>
          No results found for "{searchTerm}"
        </div>
      )}
    </div>
  );
}

export default SearchBar;
