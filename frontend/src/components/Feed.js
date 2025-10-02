import React from 'react';
import '../pages/Home.css';
import './Feed.css';
import ApiService, { AuthService } from '../services/api';

function Feed({ feedMode = 'global' }) {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [feedItems, setFeedItems] = React.useState([]);
  const [friendRequests, setFriendRequests] = React.useState([]);

  React.useEffect(() => {
    loadFeedData();
  }, [feedMode]); // Reload when feedMode changes

  const loadFeedData = async () => {
    setLoading(true);
    try 
    {
      const user = AuthService.getUser();
      
      let feedResponse;
      if (feedMode === 'global') 
      {
        feedResponse = await ApiService.getGlobalFeed();
      } 
      else 
      {
        if (!user) 
        {
          setFeedItems([{ type: 'error', message: 'Please log in to view your local feed.' }]);
          setLoading(false);
          return;
        }
        feedResponse = await ApiService.getLocalFeed(user._id);
      }
      
      let friendRequestsResponse = null;
      if (user) 
      {
        friendRequestsResponse = await ApiService.getPendingFriendRequests(user._id);
        if (friendRequestsResponse.success) 
        {
          setFriendRequests(friendRequestsResponse.pendingRequests);
        }
      }
      
      if (feedResponse.success) 
      {
        setFeedItems(feedResponse.feedItems);
      } 
      else 
      {
        setFeedItems([{ type: 'error', message: 'Unable to load feed data.' }]);
      }
      
    } 
    catch (error) 
    {
      console.error('Error loading feed data:', error);
      setFeedItems([{ 
        type: 'error', 
        message: 'Unable to load feed data. Please check your connection.' 
      }]);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  const formatFeedItem = (item) => {
    const timeAgo = (timestamp) => {
      const now = new Date();
      const time = new Date(timestamp);
      const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'just now';
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    };

    switch (item.type) 
    {
      case 'checkin':
        return `🔄 ${item.projectName} had a new check-in ${timeAgo(item.timestamp)}: "${item.message}"`;
      case 'local_checkin':
        const relation = item.isOwner ? 'your project' : 'a project you\'re in';
        return `🔄 ${item.projectName} (${relation}) had a new check-in ${timeAgo(item.timestamp)}: "${item.message}"`;
      case 'project_created':
        return `🎉 New project "${item.projectName}" was created ${timeAgo(item.timestamp)}`;
      case 'welcome':
      case 'local_welcome':
      case 'error':
        return item.message;
      default:
        return item.message || 'Unknown activity';
    }
  };

  const handleAcceptFriend = async (friendshipId) => {
    try 
    {
      await ApiService.acceptFriendRequest(friendshipId);
      loadFeedData();
    } 
    catch (error) 
    {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectFriend = async (friendshipId) => {
    try 
    {
      await ApiService.rejectFriendRequest(friendshipId);
      loadFeedData();
    } 
    catch (error) 
    {
      console.error('Error rejecting friend request:', error);
    }
  };

  if (loading) 
  {
    return (
      <div className="feed-box">
        <h2>Feed</h2>
        <div>Loading activity feed...</div>
      </div>
    );
  }

  return (
    <div className="feed-box">
      <h2>Feed</h2>
      
      {/* Friend Request Notifications */}
      {friendRequests.length > 0 && (
        <div className="friend-requests-section">
          <h3 className="friend-requests-title">Friend Requests</h3>
          {friendRequests.map((request) => (
            <div key={request._id} className="friend-request-item">
              <div className="friend-request-info">
                <img 
                  src={'/assets/images/pfp.png'} 
                  className="friend-request-avatar"
                  alt="Profile"
                />
                <span className="friend-request-text">
                  <strong>{request.requesterDetails?.name || 'Unknown User'}</strong> sent you a friend request
                </span>
              </div>
              <div className="friend-request-actions">
                <button 
                  onClick={() => handleAcceptFriend(request._id)}
                  className="btn-accept"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleRejectFriend(request._id)}
                  className="btn-reject"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Regular Feed Items */}
      <ul className="feed-list">
        {feedItems.map((item, index) => (
          <li key={index}>{formatFeedItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Feed;